!function(e){e.fn.formAjaxSubmit=function({success:n,error:t,beforeSend:s,complete:a}){const r=e(this);return r.on("submit",function(o){o.preventDefault();const i=r.attr("method"),c=r.attr("action"),f=r.attr("enctype");if(f&&"multipart/form-data"===f)var u=new FormData(r[0]);else{if("GET"===i)u=r.serialize();if("POST"===i)u=r.serializeArray()}e.ajax({type:i,url:c,data:u,success:function(e){n&&n(e,r)},error:function(e){t&&t(e,r)},beforeSend:function(){s&&s(r)},complete:function(){a&&a(r)}})}),r},e.fn.formAppendMessages=function(n,{classMessage:t,styleMessage:s}){const a=e(this);return a.find("small.sm-message").remove(),e.each(n,function(n,r){e.each(r,function(e,r){a.find(`[name="${n}"]`).after(`<small \n                            style="${s instanceof Array?s.join(";"):s||""}"\n                            class="sm-message ${t instanceof Array?t.join(" "):t||""}">\n                            ${r}\n                        </small>`)})}),a}}(jQuery);