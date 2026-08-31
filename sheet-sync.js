(function(){
  const cfg=window.PHALUAY_SHEETS||{};
  const endpoint=String(cfg.endpoint||'');
  const QUEUE_KEY='phaluay_crm_pending_v1';
  window.PHALUAY_SHEETS_READY=endpoint.startsWith('https://script.google.com/macros/s/');

  function readQueue(){
    try{
      const value=JSON.parse(localStorage.getItem(QUEUE_KEY)||'[]');
      return Array.isArray(value)?value:[];
    }catch(_){ return []; }
  }
  function saveQueue(items){
    try{ localStorage.setItem(QUEUE_KEY,JSON.stringify(items.slice(-200))); }catch(_){}
  }
  function queue(type,payload){
    const items=readQueue();
    items.push({type,payload,source:'PHALUAY MOTOR Website',timestamp:new Date().toISOString()});
    saveQueue(items);
    return {ok:true,queued:true};
  }

  async function post(record){
    await fetch(endpoint,{
      method:'POST',
      mode:'no-cors',
      headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify(record)
    });
  }

  async function flush(){
    if(!window.PHALUAY_SHEETS_READY) return {ok:false,skipped:true};
    const items=readQueue();
    if(!items.length) return {ok:true,sent:0};
    const remaining=[];
    let sent=0;
    for(const item of items){
      try{
        await post(item);
        sent++;
      }catch(_){
        remaining.push(item);
      }
    }
    saveQueue(remaining);
    return {ok:remaining.length===0,sent,remaining:remaining.length};
  }

  async function send(type,payload){
    const record={type,payload,source:'PHALUAY MOTOR Website',timestamp:new Date().toISOString()};
    if(!window.PHALUAY_SHEETS_READY) return queue(type,payload);
    try{
      await post(record);
      return {ok:true};
    }catch(error){
      queue(type,payload);
      console.warn('CRM sync queued after send failure',error);
      return {ok:true,queued:true,error};
    }
  }

  window.PhaluayCRM={
    customer:data=>send('customer',data),
    lead:data=>send('lead',data),
    booking:data=>send('booking',data),
    service:data=>send('service',data),
    flush,
    pending:()=>readQueue().length
  };

  if(window.PHALUAY_SHEETS_READY){
    setTimeout(()=>flush(),800);
  }
})();