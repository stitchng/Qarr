/*!
 * @projectname: Qarr
 * @version 0.0.4
 * @file: Qarr.js
 * @url: https://www.github.com/isocroft/Qarr
 * @author(s): Okechukwu Ifeora (@isocroft)
 * @contributor(s): nil
 * @copyright: Synergixe™ Copyright(c) 2016 All rights reserved
 * @desc: {This is a library meant to structure application development for ReactJS Apps}
 * @tags: {lirary, es5, reactjs}
 * @releasedate: 01/09/2016
 * @modifieddate: 24/08/2016
 */	

/**!
 * Inspired by => Nicolas Zakas (front-end engineer at Yahoo)
 * :::::::::::::::::::::::::::::
 * Synergixe™ Copyright (c) 2016.  
 */
 
 
!function(win, name, bigfactory){
             
            if(win[name]){
                   console.log(name+" object already defined!");
                   return;
            }

            if(!('radians' in Math)){
                Math.radians = function(degrees){
                    return (degrees * Math.PI / 180);
                }     
            }

            if(!('degrees' in Math)){
                Math.degrees = function(radians){
                    return (radians * 180 / Math.PI);
                }     
            }
			 
		win["TaskRunner"] = (function(){
			                 // Constructor
                                   function Task(e, t) {
                                       this.handler = e,
                                       this.args = t;
                                   }
                                   // Public method - {run}
                                   Task.prototype.run = function(con) {
                                       if ("function" == typeof this.handler){
                                             return this.handler.apply(con, this.args);
                                       }else {
                                            var scriptSource = "" + this.handler;
                                            return eval(scriptSource);
                                       }
                                   };
                             
                                   var tasksCount = [], nextHandle = 1, tasksByHandle = {}, currentlyRunningATask=false;
                             
                             
                             return {
							 
							        addTask:function(){
									     var self = this;
									     return self.addFromSetImmediateArguments.call(self, arguments, self.title);
									},
                             
                                    addFromSetImmediateArguments:function(e, k){
                                         var t = e[0], n = slice.call(e, 1), r = new Task(t, n), i;
										 if(typeof k === "string"){
										     tasksCount.push({task:k});
										 }
										 i = nextHandle++;
										 tasksByHandle[i] = r;
                                         return i;
                                    },
									
									getTasksCount:function(){
									    return tasksCount.length;
									},
                             
                                    runIfPresent:function(e, afterTask){
								            e*=1;
                                            if (currentlyRunningATask){
                                                      win.setTimeout(function() {
                                                            this["TaskRunner"].runIfPresent(e, afterTask);
                                                      }, 10);
                                            }else {
                                                 var self = this, t = tasksByHandle[e];
                                                 if(t && t instanceof Task){
                                                       currentlyRunningATask=!0;
                                                       try {
                                                           var y = t.run();
														   if(y && typeof y.promise == "function"){
														       if(y.promise().promise && typeof y.then == "function"){
															        y.then(function(result){
																        if(typeof afterTask === "function"){
										                                    afterTask(result);
									                                    }
																		currentlyRunningATask=!1;
																		//y = null;
																    });
															   }else{
															      throw new Error("TaskRunner: fake promise found!");
															   }
														   }else{
														        currentlyRunningATask=!1;
														   }
                                                       }finally {
                                                            self.remove(e);
                                                       }
                                                   }
                                            }
                                    },
                             
                                    remove: function(e) {
                                             delete tasksByHandle[e];
											 tasksCount.splice(e-1);
                                    }
                                }
                             
            }());
             
         
             
             var ob = ({}),
			     hOwn = ob.hasOwnProperty,
                 toStr = ob.toString,
				 d = win.document,
                 slice = [].slice,
                 push = [].push,
				 isNullOrUndefined = function(subject){ return (subject === void 0); }
                 concat = [].concat,
                 execs = [];
             
                  execs.push(function(){
                             
							 "use strict";
				            
							// Add custom routines	
							 Object.empty = function(){
							 
							 };

                                           Object.assign = function(){

                                           }
							 
                             Object.keyExists = function(d,key){
                            	    return !!d[key] && hOwn.call(d, key);
                             };
							
			                 Object.getKeyCount = function(d, all){ 
			     	                     var count=0;
										 for(var n in d){
										    if(!all && Object.keyExists(d, n))
			     	   	                         count++;
											else
                                                 count++;											
										 } 
			     	                     return count;
			                 };
							
                             Object.clearKeys = function(d){
                             	      for(var n in d){
									     if(Object.keyExists(d, n))
                             	      	       delete d[n];
                             	      }
                             };
                             
                            
                             // Shim missing functionality for ES5 global Generics
                           
                             Object.create = Object.create || function (fi) {

                                           if (typeof (fi) != 'object' && typeof (fi) != 'function') {
                                                                return;
                                           }

                                           var j = new Function();

                                           j.prototype = fi;

                                           return (new j());

                             }

                            Object.keys = Object.keys || function (fu){
                                            if (typeof (fu) != 'object' && typeof (fu) != 'function') {
                                                                          return;
                                            }
                                            var j = [];
                                            for (var k in fuc) {
                                                  if(hOwn.call(fuc, k)) {
                                                        j.push(k)
                                                  }
                                            }
                                            var l = !ob.propertyIsEnumerable('toString'), 
											    m = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'prototypeIsEnumerable', 'constructor'];

                                            if(l) {
                                                 for (var n = 0; n < m.length; n++) {
                                                        var o = m[n];
                                                        if(hOwn.call(fuc, o)) {
                                                             j.push(o);
                                                        }
                                                 }
                                            }
                                            return j;
                            }

   
                            Array.filter = Array.filter || function (arr, func, i) {
                                      if (!(arr instanceof Array) && typeof(func) != 'function') { return; }
                                      var f, x = arr, n = [];
                                      for (d = 0; d < x.length; ++d){

                                              f = x[d];

                                            if (func.call(i, f, d, x) === true){
                                                    n.push(f);
                                            }
                                      }
                                   return n;
                            }
    


    
                             String.replace = String.replace || function (a, RE, out) {
                                             if (typeof(this) == 'function') {
                                                     this.apply(ob, new Array(arguments));
                                             }
                                             if (typeof (a) != 'object') {
											        return; 
											 }
                                             var Comp = [];
                                             for (var i = 0; i < a.length; i++){
                                                         Comp[i] = a[i].replace(RE, out);
                                             }
                                             if (Comp) { return Comp; }
                                             return null;
                            }

                            Array.prototype.pluck = function(array){
                                 return this.map(function(obj){ var result = {}; array.forEach(function(val){ result[val] = obj[val]; }); return result; });
                            };
    
    
                            Array.isArray = Array.isArray || function (arr) {
                                   return arr && (arr instanceof Array);
                            }
							
							Array.isArrayLike = function(obj){
							     
								 if(isNullOrUndefined(obj)){
								     return false;
								 }
								  
								   if("length" in obj){
								   
								        if((obj.window) || (typeof obj === "function")){
										    return false;
										}
									 
									    return "NaN" !== String((Math.max(parseInt((obj).length), -1)));
										 
								   }	 
								 
								  return false;
								  
							}
							
							/* Tempoaray definitions */
							Array.inArray = Array.inArray || function(arr, arrElem) {
                                           for (var i = 0; i < arr.length; i++) {
                                               if (arr[i] === arrElem) return true;
                                           }
                                           return false;
                            }
							
							
							if(!Array.prototype.indexOf){
							    Array.prototype.indexOf = function(arrElem) {
                                           for (var i = 0; i < this.length; i++) {
                                               if (this[i] === arrElem) return i;
                                           }
                                           return -1;
                                }
							}	
							
							Object.each = function (obj, iterator, context) {
                             var key, length, temp, results; 
							 
                             if (obj) {
                             if (typeof obj === "function") {
							  results = (function(){});
                             for (key in obj) {
                             // Need to check if hasOwnProperty exists,
                             // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                             if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || hOwn.call(obj,key))) {
                                  temp = iterator.call(context, obj[key], key, obj);
								  if(!isNullOrUndefined(temp))
								      results[key] = temp;
                             }
                             }
                             } else if (Array.isArray(obj) || Array.isArrayLike(obj)) {
                             var isPrimitive = typeof obj !== 'object'; 
							 results =  [];
                             for (key = 0, length = obj.length; key < length; key++){
                             if (isPrimitive || key in obj) {
                                  temp = iterator.call(context, obj[key], key, obj);
								  if(!isNullOrUndefined(temp))
								       results.push(temp);
                             }
                             }
                             } else if (obj.forEach) {
							      results = [];
                                  obj.forEach(function(){ 
								        temp = iterator.apply(this, slice.call(arguments)); 
										if(!isNullOrUndefined(temp))
								            results.push(temp);
								  }, context);
                             } else {
							  results = {};
                             for (key in obj) {
                             if (obj.hasOwnProperty(key)) {							       
                                    temp = iterator.call(context, obj[key], key, obj);
								    if(!isNullOrUndefined(temp))
									    results[key] = temp;
                             }
                             }
                             }
                             }
                             return (results)? results : obj;
                             }
   
							
							 // Shim missing functionality in ES5 global Constructors
							 
                            var proto,
                                pT = 'prototype',
				                constrMap = {
                                     A:Array,
                                     S:String,
                                     F:Function
                             },
                             getCstor = function(d){ return d && !hOwn.call(d, "constructor") && d.constructor;  },
							 looper = function(name){
							 
							     return function(val, key, dmap){
                                     if(this[key]){
                                         ;
                                     }else{
                                         this[key] = val;
                                     }
                                 }
							 },
                             addToPrototype = function(defMap, proto, n){
                                  Object.each(defMap, looper(n), proto);
                             },
                             definitions = {
							       A:{
                                          
                                    map:function (h, i){
                                        if (typeof h != 'function') {
                                                 return;
                                        }
  
                                        var j, k = this.length, l = new Array(k);

                                        for (j = 0; j < k; ++j) {

                                              if (j in this) {
                                                    l[j] = h.call(i, this[j], j, this);
                                              }
                                        }
                                             return l;
                                    },
    

                                    some:function (h, i) {
                                                if(typeof (h) != 'function'){
                                                    return;
                                                }

                                                var j = new (ob.constructor)(this), k = j.length;

                                                for (var l = 0; l < k; l++) {

                                                   if(l in j){

                                                       if (h.call(i, j[l], l, j)) {
                                                              return true;
                                                       }
                                                   }
                                                }
                                                return false;
                                    },
  
                                    copy:function (init, length) {
                                            init = parseInt(init) || 0;
                                            if (init < 0) init = this.length + init;
                                            length = parseInt(length) || (this.length - init);
                                            var newArray = [];
                                            for (var i = 0; i < length; i++) newArray[i] = this[init++];
                                            return newArray;
                                    },
									
                                    reduceRight:function (fun) {
                                                var len = this.length;
                                                if(typeof fun != "function" && len == 0 && arguments.length == 1){
                                                              return;
                                                }
                                                var i = len - 1;
                                                       if (arguments.length >= 2) {
                                                            var rv = arguments[1];
                                                       }else {
                                                            do {
                                                               if (i in this){
                                                                      rv = this[i--];
                                                                      break;
                                                               }
                                                               if (--i < 0) return;
                                                           }while (true);
                                                       }
                                                       for (; i >= 0; i--){
                                                             if (i in this){
                                                                    rv = fun.call(null, rv, this[i], i, this);
                                                             }
                                                       }
                                                        return rv;
                                    },
									indexOf:function(arrElem) {
                                           for (var i = 0; i < this.length; i++) {
                                               if (this[i] === arrElem) return i;
                                           }
                                           return -1;
                                    },
									
                                    forEach:function(f, i) {
                                          return (this.map.call(this, f, i));
                                    },
									
                                    lastIndexOf:function (arlm) {
                                            for (var u = this.length - 1; u > -1; u--){
                                                  if (this[u] === arlm){
                                                           return u;
                                                  }
                                            }
											return -1;
                                    },
                                    assoc:function (arrKeys){
                                           if (!arreys || !(arrKeys instanceof Array)) return;
                                               var obj = {}, len = (this.length === arrKeys.length) ? this.length : arrKeys.length;
                                               for (var i = 0; i < len; i++) obj[arrKeys[i]||""+i] = this[i];
                                                  return obj;
                                    },
									every:function (h, i){
                                           if (typeof (h) != 'function') {
                                                          return;
                                           }
                                           var j = new ob.constructor, k = j.length;

                                          for (var l = 0; l < k; l++) {
                                                if (l in j) {
                                                    if (!h.call(i, j[l], l, j)) {
                                                          return false;
                                                    }
                                                }
                                          }
                                          return true;
                                    }
    
                                  },
				  S:{
                                      trim:function(){
                                          return (this.replace(/(^\s+(.*))/, function(match, m1, m2, offset, str){ // IE4+ can sure handle this!!
                                           	return  m2.replace(/\s+$/,"");  
                                           }));
                                      },
                                      endsWith:function(suffix){
                                      	
                                      	if(!suffix.length){return true;} 
                                      	if(suffix.length>this.length){return false;} 
                                      	return(this.substr(this.length-suffix.length)==suffix);
                                      	
                                      },
                                      trimRight:function(){
                                            return this.replace(/^\s+/, "");
                                      },
                                      startsWith:function(prefix){
                                      	     if(!prefix.length){return true;} 
                                      	     if(prefix.length>this.length){return false;} 
                                      	     return(this.substr(0,prefix.length)==prefix);
                                      }
                                  },
                                  F:{       
                                     bind:function(){
                                                   var fn = this,
                                                   args = [].slice.call(arguments),
                                                   object = args.shift();
                                                   return fn.apply(object, args.concat([].slice.call(arguments)));
                                     }
                                  }
                                  
                             },
							 i;
                             
                             
                             for(i in definitions){
                             	   proto = constrMap[i];
                             	   proto = proto[pT];
                                   addToPrototype(definitions[i], proto, i);
                             }
              
                             definitions = addToPrototype = i = looper = constrMap = getCstor = proto = null;
                            
                   }, function(global){
                         
                         "use strict";
						 
			 // Shim functionality for 'requestAnimationFrame'
                             
                         for(var a=["webkit","moz","ms"], m=0; m<a.length && !window.requestAnimationFrame; ++m){
                             var l=a[m];
                             global.requestAnimationFrame = global[l+"RequestAnimationFrame"];
                             global.cancelAnimationFrame = global[l+"CancelAnimationFrame"]||global[l+"CancelRequestAnimationFrame"]
                        }
                             
                        if(/iP(ad|hone|od).*OS 6/.test(global.navigator.userAgent)||!global.requestAnimationFrame||!global.cancelAnimationFrame){
                             var k=0;
                             global.requestAnimationFrame=function(a, e){
                                    var c=Date.now()||(new Date).getTime(),
                                    f = Math.max(k+16,c);
                                    return setTimeout(function(){
                                               a(k=f)
                                    },f-c);
                             };
							 
                             global.cancelAnimationFrame=clearTimeout;
                             
                       }
     
                             
                  }, function(global){
                  	
                  	 "use strict";
                     // Shim functionality for 'setImmediate'
                             
                        function canUseNextTick() { /* for NodeJS env */
                                return "object" == typeof process && "[object process]" === toStr.call(process)
                        }
                        function canUseMessageChannel() {
                             return !!global.MessageChannel
                        }
                        function canUsePostMessage() {
                             if (!global.postMessage || global.importScripts)
                             return !1;
                             var g=!0, t = global.onmessage;
                             return global.onmessage = function(e) { g=!1 }, global.postMessage("[null]", "*"), global.onmessage = t, g
                        }
                             
                        function canUseReadyStateChange() {
                             return "document"in global && "onreadystatechange"in global.document.createElement("script")
                        }
                        function installNextTickImplementation(e) {
                             e.setImmediate = function() {
                                  var e = TaskRunner.addFromSetImmediateArguments(arguments);
                                  return process.nextTick(function() { TaskRunner.runIfPresent(e); }), e
                             }
                        }
                        function installMessageChannelImplementation(e) {
                             var t = new global.MessageChannel;
                             t.port1.onmessage = function(e) {
                                var t = e.data;
                                TaskRunner.runIfPresent(t)
                             }, e.setImmediate = function() {
                                  var e = TaskRunner.addFromSetImmediateArguments(arguments);
                                  return t.port2.postMessage(e, "*"), e;
                             }
                        }
                             
                             
                        function installReadyStateChangeImplementation(e) {
                             e.setImmediate = function() {
                                  var e = TaskRunner.addFromSetImmediateArguments(arguments), t = global.document.createElement("script");
                                  return t.onreadystatechange = function() {
                                      TaskRunner.runIfPresent(e), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                                  }, global.document.documentElement.appendChild(t), e
                             }
                        }
						
						function installPostMessageImplementation(e){
						       global.onmessage = function(e){
							      var t = e.data;
								  TaskRunner.runIfPresent(t);
							   },
						       e.setImmediate = function(){
							       var e = TaskRunner.addFromSetImmediateArguments(arguments);
								   return global.postMessage(e.toString(), "*"), e;
							   }
						}
                             
                        function installSetTimeoutImplementation(e) {
                             e.setImmediate = function() {
                                 var e = TaskRunner.addFromSetImmediateArguments(arguments);
                                 return global.setTimeout(function() { TaskRunner.runIfPresent(e); }, 0), e;
                             }
                        }
                             
                    
                             
                             
                             if (!global.setImmediate) {
                                  var attachTo = "function" === typeof Object.getPrototypeOf && "setTimeout" in Object.getPrototypeOf(global) ? Object.getPrototypeOf(global) : global;
                                      canUseNextTick() ? installNextTickImplementation(attachTo) : canUsePostMessage() ? installPostMessageImplementation(attachTo) : canUseMessageChannel() ? installMessageChannelImplementation(attachTo) : canUseReadyStateChange() ? installReadyStateChangeImplementation(attachTo) : installSetTimeoutImplementation(attachTo), attachTo.clearImmediate = function(j){ TaskRunner.remove(j); }
                             }

                             
                 
                  });
             
                  for(var y=0; y < execs.length; y++){
             
                      execs[y].call(null, win);
             
                  }
				  
				  var supportsCheckTable = {
                        "webgl": "return 'WebGLRederingContext' in window && (document.createElement('canvas').getContext('experimental-webgl') || document.createElement('canvas').getContext('webgl'));",
                        "template":"return 'context' in document.createElement('template');",
			            "localstorage":"var x; \
                                       try{ \
                                         x = typeof Storage !== 'undefined' && 'localStorage' in window && window['localStorage'] !== null; \
                                       }catch(ex){ \
                                           x = !(window.location.protocol.indexOf('file:') > -1) && false; \
                                       } \
                                       return x;", 
			            "touchgesture":"return 'ontouchstart' in window"
                  },
				  
				  tests = function(feature){
				       var x, __func, all = {};
				       for(x in supportsCheckTable){
                           if(hOwn.call(supportsCheckTable, x)){
				              __func = new Function(supportsCheckTable[x]);
                              all[x] = (__func)();
                          }
                       }
					   return (feature)? all[feature] : all;
				  },
             
                  __wap = win[name] = bigfactory(win, hOwn, toStr, slice, tests);
             
                  __wap.HTML5Supports = tests();



                  var RouteViewAnimator = (function(win, tools){
                       //TODO: implement animator with requestAnimationFrame
                  }(win, __wap.Application.request("tools")));


                  __wap.Application.router = {

                        boot:function(routes_settings){
                             var settings = __wap.Application.request("applicationSettings");
                        },

                        plugRoutes:function(routes_defs){
                              var registry = __wap.Application.request("routeRegistry");
                              registry.register(routes_defs, function(templateManager){
                                    var target = document.getElementById("qarr-view");
                                    var templateParts = ["<div id='qarr-animator-box' style='width:auto !important;'>","</div>"]; 
                                    
                                    
                                    return function(hash){
                                          if(target !== void 0){
                                               target.innerHTML = templateParts.join(templateManager.get(hash)); 
                                          }
                                    };

                              });
                        }
                  };
                   
                  __wap.Application.start = function(fn){
                        var registry = __wap.Application.request("routeRegistry");
                        registry.watch(fn);
                  }; 
             
                  execs = concat = push = d = x = null; // free some memory...
             
             }(this, "Qarr", function(w, $h, $s, $sl, $UAtests, undefined){
               
               // No need for "use strict"; cos we'll be disobeying some rules here!!
               
                var Qarr,
				
		   doc = w.document,
               
                  nav = w.navigator,
               
                  loc = w.location,
               
                  regex = /(?:(file|http|ws|ssh|https|ftp)\:\/\/(?:\/)?)?([^\/]+)(?:\/([^\/]+))\/((?:#[\w]+)?[^\.]+\.[a-zA-Z]+)?/g,
               
                  UriRgx = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
               
                  b64array = "ABCDEFGHIJKLMNOP"+
                             "QRSTUVWXYZabcdef"+
                             "ghijklmnopqrstuv"+
                             "wxyz0123456789+/=",
                  pkey =     "ABCDEFGHIJKLMN"+
                             "OPQRSTUVWYZ0123456789ab"+
                             "cdefghijklmnopqrstuvwxyz@ ,"+
                             "!#$%^*/?><:;+_-=.",
               
                 avf = "0123456789abcdef",
               
                 pM = 'postMessage',
             
                 cI = 'clientInformation',
               
                 aEL = 'addEventListener',
               
                 rEL = 'removeEventListener',
               
                 aE = 'attchEvent',
             
                 cE = 'createElement',
				 
				 aC = 'appendChild',
				 
				 oD = 'ownerDocument',
               
                 dE = 'detachEvent',
             
                 gETN = 'getElementsByTagName',
				 
				 cTN = 'createTextNode',
               
                 dEm = 'documentElement',
				 
				 nT = 'nodeType',
				 
				 nN = 'nodeName',
				 
				 oP = 'offsetParent',
               
                 dM = 'documentMode',
                 
                 noop = function(c){ return c; },

                 noopArray = ["","","",""],
				 
		     rAllFunc = /^(?:[\r|\r?\n|\s]*)function(?:[\r|\r?\n|\s]*)(?:([^\r\n\s]+?)|)(?:[\r|\r?\n|\s]*)\((?:[\r|\r?\n|\s]*)([^\)]*)(?:[\r|\r?\n|\s]*)\)(?:[\r|\r?\n|\s]*)\{(.*)\}(?:[\r|\r?\n|\s]*)$/ig,
				 
		     CreateMSXMLDocument = function(){
				 
				       var progIDs=[
                            	   'Msxml2.DOMDocument.3.0',
                            	   'Msxml2.DOMDocument',
                            	   "Msxml2.DOMDocument.6.0", 
                                   "Msxml2.DOMDocument.5.0", 
                                   "Msxml2.DOMDocument.4.0", 
                                   "MSXML2.DOMDocument", 
                                   "MSXML.DOMDocument"
                            	];
                            	       
                            if(w.ActiveXObject){
                            	for(var i=0;i<progIDs.length;i++){
                            	       	try{
                            	       	      return (new ActiveXObject(progIDs[i]));
                            	        } catch(ex){ }
                            	}
							}	
				 },
                 
                 futuresStates = {
                      STARTED:0,
                      AWAIT:1,
                      RESOLVED:2,
                      REJECTED:3
                 },
                 formatOptions = function(opts){
                      var options = {};
                      (String(opts).split(",")).forEach(function(key){
                                options[key] = true;
                      });
					  options.savedData = !1;
                      return options;
                },
                 Routines = function(opts){
	
                   var options = formatOptions(opts),
                       fireStart,
                       fireEnd,
                       index,
                       fired,
                       firing,
                       pending = [],
                       queue = options.multiple && [],
                       fire = function(data){
                             options.savedData = !fire.$decline && options.save && data; // save it only when we are not rejecting {fire.$decline != true}!
                             fired = true;
                             firing = true; // firing has begun!
                             index = fireStart || 0;
                             fireEnd = pending.length;
                             for(fireStart = 0; index < fireEnd; index++){
                                  setTimeout(pending[index].bind(data[0], data[1]), 50); // fire asynchronously (Promises/A+ spec requirement)
                             }
                             firing = false; // firing has ended!
        
                             if(queue){ // deal with the queue if it exists and has any contents...
                                 if(queue.length){
								     return fire(queue.shift()); // fire on the {queue} items recursively
                                 }
                                  // if queue is empty.... then end [flow of control] at this point!
                             }
        
                             fire.$decline = false;
							 
					if(options.savedData){
						if(options.unpack){
						    // clear our {pending} list and free up some memeory!!
							pending.length = 0; // saves the reference {pending} and does not replace it!
						}
					}
                };
	
	return {
    add:function(){
        var len = 0;
        if(pending){ // if not disbaled
            
            var start = pending.length;
            (function add(args){
             
                   args.forEach(function(arg){
				          var type = typeof arg;
                          
                          if(type == "function"){
                            //if(!fired){  this seems to be the reason for not triggering on late activation!!
                                len = pending.push(arg);
                            //}
                          }else{
                             if(!!arg && arg.length && typeof arg != "string")
                                 add([].slice.call(arg)); // inspect recursively
                          }
                   });
             
             }([].slice.call(arguments)));
            
            
			if( fired ){ // if we have already run the {pending} list of routines at least once, ...
				   if(options.join){
					  fireStart = start; 
					  fireEnd = len; // update info again...
					  fire.$decline = true;
					  fire( options.savedData ); // fire with the saved data 
					  this.disable();
					  
				   }  
			}
            
            
        }
        return len;
    },
    hasFn:function(fn){
	    var result = false;
        Object.each(pending, function(val){
		     if(typeof fn === "function" && fn === val)
			      result = true;
		}, this);
		return result;
    },
    hasList:function(){
        return !!pending; // [false] only when the disabled(); method has been called!!
    },
    fireWith:function(/* context, args */){
        if(pending && (!fired || queue)){
            var args = arguments.length && [].slice.call(arguments) || [null, 0];
            //,context = args.splice(0, 1) || [];
            //args = [context[0], args];
            
            if(firing){ // we are currently iterating on the {pending} list of routines
                queue.push( args ); // queue assets for recursive firing within {fire} function later
            }else{
                fire( args );
            }
        }
    },
    disable:function(){
	    if(!options.savedData){
             pending = queue = undefined;
	    }
    }
  };
    
},
  // Implementation of the Promises/A+ spec 
Futures = function(){
	
    var defTracks = {
        resolve:['done', 'RESOLVED', Routines(['join', 'save'])],
        reject:['fail', 'REJECTED', Routines(['join','save'])],
        notify:['progress', 'AWAIT', Routines(['join', 'multiple'])]
    },
    self = this,
    keys = Object.keys(defTracks),
    setter = function(dx, arr,  forPromise){
        var drop = (dx != "notify");
        if(!arr.length && !forPromise) return defTracks[dx][2].fireWith;
        return (!forPromise)? function(){
            if(self.state >= 0 && self.state <=1){
                self.state = futuresStates[defTracks[dx][1]];
            }
            defTracks[dx][2].fireWith(self === this? self : this, [].slice.call(arguments));
            if(drop){
			    defTracks[arr[0]][2].disable();
                defTracks[arr[1]][2].disable();
			    switch(dx){	
				   case "reject":
				   case "resolve":
				      self.state = futuresStates[defTracks[dx][1]];
				   break;
			    }	
			}
            return true;
        } : function(){
            if(self.state >= 0 && self.state <=1){
                defTracks[dx][2].add.apply(self, [].slice.call(arguments));
            }
            return self;
        } ;
    },
    i = 0,
    ax = keys.slice(),
    d,
    promise = {};
    
    
    // using a closure to define a function on the fly...
    for(d in defTracks){
        if($h.call(defTracks, d)){
            keys.splice(i++, 1);
            self[d] = setter(d, keys);
            self[d+"With"] = setter(d, []);
            promise[defTracks[d][0]] = setter(d, [], true);
            keys = ax.slice();
        }
    }
    
    
    promise.state = futuresStates.STARTED;
	
    promise.always = function(){
        return this.done.apply(self, arguments).fail.apply(self, arguments);
    };
	
    promise.promise = function(obj){
        if(obj && typeof obj == "object" && !obj.length){
            for(var i in promise){
                if($h.call(promise, i)){
                    obj[i] = promise[i];
                }
            }
            return obj;
        }
        return promise;
    };
	
    promise.then = function(/* fnDone, fnFail, fnProgress */){
        var ret, args = [].slice.call(arguments);
        args.forEach(function(item, i){
                     item = (typeof item == "function") && item;
                     self[defTracks[keys[i]][0]](function(){
					       var rt;
					       try{ // Promises/A+ specifies that errors should be conatined and returned as value of rejected promise
                               rt = item && item.apply(this, arguments);
                           }catch(e){ 
						       rt = this.reject(e);
						   }finally{
						       if(rt && typeof rt.promise == "function")
                                    ret = rt.promise();						   
						   }	   
                     });
        });
        return self.promise(ret);
    };
	
    promise.isResolved = function(){
        return !defTracks['reject'][2].hasList();
    };
    promise.isRejected = function(){
        return !defTracks['resolve'][2].hasList();
    };
    promise.pipe = promise.then;
    
    promise.promise(self);
    
    Futures.STARTED = futuresStates.STARTED;
    Futures.AWAITING = futuresStates.AWAIT;
    Futures.RESOLVED = futuresStates.RESOLVED;
    Futures.REJECTED = futuresStates.REJECTED;
    
    
    setter = ax = d = i = null; // avoid leaking memory with each call to Futures constructor!!
    
	// enforce new!
	return (self instanceof Futures)? self : new Futures();
},
             
                 onload = w[aEL] || w[aE],
             
                 offload = w[rEL] || w[dE],

                 haspost =  !!w[pM],
             
                 isIE6 = !!w[cI] && w[cI].appVersion.match(/\s*MSIE\s*6/),
               
                 isIE = !!doc[dM] || isIE6,
				 
				 undoEvent = function(evt, fn, c){
				     try{
                           offload.apply((c||w), ((isIE  && (doc[dM] || 5) < 9) ? ["on"+evt, fn] :  [evt, fn, false]));
                     }catch(_ignore){
					 
					 }
				 },
             
                 doEvent = function(evt, fn, c){
           
                     try{
				 onload.apply((c||w), ((isIE && (doc[dM] || 6) < 9) ? ["on"+evt, fn] :  [evt, fn, false]));
                     }catch(_ignore){  }
             
                 },

                 dependencyInject_DOM = function(fn, arr){
                     var args = (rAllFunc.exec(String(fn)) || noopArray)[2];
                         args = args.split(",");
                         args = arr.slice(0, args.length);
                         return args.map(function(v){ return doc.getElementById(v.replace('$','')); });
                 },

                 Delegate = {}, 
                 
                 __Namespace = function(name){
                 	     this.__typeName=name;
                 
                 },
                 _create = function(targets){
                 	  var delegate=function(){
                 	  	   if(targets.length==2){
                 	  	   	  return targets[1].apply(targets[0],arguments);
                 	  	   	
                 	  	   } else{
                 	  	   	for(var i=0;i<targets.length;i+=2){
                 	  	   		targets[i+1].apply(targets[i],arguments);
                 	  	   		
                 	  	   	} return null;
                 	  	   	
                 	  	   }
                 	  	
                 	  };
                 	  delegate.invoke=delegate;
                 	  delegate._targets=targets;
                 	  return delegate;
                 },
				 /* @REM: almost done!! -- "cachestore" */
				 generateFunction = function(funcStr){
                          var fbits = rAllFunc.exec(funcStr);
						  if(!fbits){
						     return funcStr;
						  }
						  
                          if(funcStr.indexOf("[native code]") === -1){
                                return (new Function(fbits[2], fbits[3]));
                          }else{
						       return (fbits[1])? w[fbits[1]] : noop;
						  }
						   
						  return noop;
				 },		   
                         extendObj = function(Obj1, Obj2, deep, transformCallback) {
				            var temp;
                            for (var prop in Obj2){
                               if('hasOwnProperty' in Obj2){
							          
                                   if (Obj2.hasOwnProperty(prop) && !($h.call(Obj1, prop))){
								       if(deep && Obj2[prop] && typeof(Obj2[prop]) === "object" && !('length' in Obj2[prop])){
									          Obj1[prop] = extendObj((Obj1[prop] || {}), Obj2[prop], deep, transformCallback);
                                       }
									   temp = (transformCallback)? transformCallback(Obj2[prop], prop) : Obj2[prop];
                                       Obj1[prop] = (Array.isArray(temp))? $sl.call(temp) : temp ;  // copy the property or method from [Obj2] to [Obj1] if [Obj1] does not have it!
                                   }
                                   if(Obj2.hasOwnProperty(prop) && $h.call(Obj1, prop)){
								       if(deep && Obj2[prop] && typeof(Obj2[prop]) === "object" && !('length' in Obj2[prop])){
									          Obj1[prop] = extendObj((Obj1[prop] || {}), Obj2[prop], deep, transformCallback);
                                       }
                                       temp = (transformCallback)? transformCallback(Obj2[prop], prop) : Obj2[prop];
                                       Obj1[prop] = (Array.isArray(temp))? $sl.call(temp) : temp ; // update [Obj1] using values from [Obj2] if [Obj1] does have it!
                                   }
                               }else{ // since window/DOM [Obj1] object in IE 8 does not support 'hasOwnProperty' method!!!
                                      if($h.call(Obj2, prop) && !Obj1[prop]){
									          temp = (transformCallback)? transformCallback(Obj2[prop], prop) : Obj2[prop];
                                              Obj1[prop] = (temp)? temp : Obj2[prop];
                                      }
                               }
                           }
                           return Obj1;
                 },
				
                 Type = {};
				 
				 // Logger interface
				 
				 function Logger(config){

					   this.config = config || {};
					   this.localDriver = w.console;
					   this.remoteDriver = this.config.driver; 
					   this.currentErrorObj = null;
					   this.promiseObj = null;

					   var self = this;
					   var hasW3CEvent = ('addEventListener' in w);
					   var hasWHATWGEvent = ('onerror' in w);
					   var original = hasWHATWGEvent && w.onerror;

					   if(hasW3CEvent){
						  this.promiseObj = new Futures(); // Futures is my custom Promises/A+ implementation
						  w.addEventListener('error', function(event){
							 setTimeout(function(){ 
							   if(self.currentErrorObj === null){
								   self.currentErrorObj = event.error;
								   if(!('message' in self.currentErrorObj)){
										self.currentErrorObj.message = event.message;
								   }
							   }
							   self.promiseObj.resolve(self.currentErrorObj.stack);
							 },1); // delay the event until all synchronously handled events finish executing 
						  });
					   }
					   
					   if(hasWHATWGEvent){
						 w.onerror = function(message, source, lineNumber, columNumber, errObj){
						   if(self.currentErrorObj === null){
							   self.currentErrorObj = errObj || null;
						   } 
					  
						   var bound = self.log.bind(self, 'error', {
							  message:message,
							  file:source,
							  lineNumber:lineNumber,
							  columnNumber:columNumber
						   }); 
						  

						   if(!self.currentErrorObj || hasW3CEvent){ // if this evaluates to true, it means we are to wait for the W3C event
							  self.promiseObj.then(bound, function(val){ 
									self.promiseObj = val; 
							  });
						   }else{
							   // clear the timeout
							   if(self.promiseObj){
								  self.promiseObj.reject(null);
							   }
							   if(self.currentErrorObj){
								   bound(self.currentErrorObj.stack);
							   }
						   }
						};   
					  }
					  return this;
                 };

				Logger.prototype.log = function(logType, details, stack){
				  if(!this.config.disabled && this.defaultDriver){
					this.defaultDriver[logType](details.message, details.file + "\n\n" + details.lineNumber + "\n\n" + details.columNumber, stack);
				   }
				   if(this.config.env === "local" 
						&& !this.config.disabled
						&& (this.currentErrorObj instanceof Error)){
						this.dispatchToScreen(this.config.screen_dispatch);
						//original && original();
				   }
				}

				Logger.prototype.dispatchToScreen = function(dispatch){
					 if(dispatch){
					     alert(this.currentErrorObj.toString());
					 }
				}

				Logger.prototype.disable = function(localLogOff){
					this.config['disabled'] = true;
				}

				Logger.prototype.setConfig = function(key, value){
				   this.config[key] = value;
				   return true;
				}
                 
                __Namespace.prototype={ 
                	  __namespace:true,
                	  getName:function(){
                	  	 return this.__typeName;
                	  	
                	  }
                	
                };	
 
                 
                 Delegate.Null = function(){};
                 
                 Delegate.create=function(object,method){
                 	   if(!object){
                 	   	method.invoke=method;
                 	   	return method;
                 	   	
                 	   } 
                 	   return _create([object,method]);
                 	
                 };
                 
                 Delegate.combine=function(delegate1,delegate2){
                 	    if(!delegate1){
                 	    	  
                 	    	  if(!delegate2._targets){
                 	    	  	return Delegate.create(null,delegate2);
                 	    	  	
                 	    	  } 
                 	       return delegate2;
                 	    } 
                 	    
                 	    if(!delegate2){
                 	    	
                 	    	if(!delegate1._targets){
                 	    		return Delegate.create(null,delegate1);
                 	    		
                 	    	} 
                 	    	return delegate1;
                 	    	
                 	    } 
                 	    var targets1=delegate1._targets?delegate1._targets:[null,delegate1],
                 	        targets2=delegate2._targets?delegate2._targets:[null,delegate2];
                 	        return Delegate._create(targets1.concat(targets2));
                 	
                 }

                 Delegate.remove=function(delegate1,delegate2){
                 	
                 	if(!delegate1||(delegate1===delegate2)){
                 		return null;
                 		
                 	}
                 	
                 	if(!delegate2){
                 		
                 		return delegate1;
                 		
                 	} 
                 	
                 	var targets=delegate1._targets,
                                      object=null,
                                	method;
                 	
                 	if(delegate2._targets){
                 		object=delegate2._targets[0];
                 		method=delegate2._targets[1];
                 		
                 	} else{
                 		method=delegate2;
                 		
                 	}
                 	
                 	for(var i=0;i<targets.length;i+=2){
                 		
                 		if((targets[i]===object)&&(targets[i+1]===method)){
                 			if(targets.length==2){
                 				return null;
                 				
                 			} 
                 			targets.splice(i,2);
                 			return _create(targets);
                 			
                 		}
                 		
                 	} 
                 	return delegate1;
                 	
                 }

                 Delegate.createExport = function(delegate,multiUse){var name='__'+(new Date()).valueOf();Delegate[name]=function(){if(!multiUse){Delegate.deleteExport(name);} delegate.apply(null,arguments);};return name;}

                 Delegate.deleteExport = function(name){if(Delegate[name]){delete Delegate[name];}}

                 Delegate.clearExport = function(name){if(Delegate[name]){Delegate[name]=Delegate.Null;}}
                 
                 
                 Type.createNamespace = function(name, asGlobal){
                 	  if(!w.__namespaces){
                 	  	 w.__namespaces={};
                 	  	
                 	  } 
                 	  if(!w.__rootNamespaces){
                 	  	 w.__rootNamespaces=[];
                 	  	
                 	  } 
                 	  
                 	  if(w.__namespaces[name]){
                 	  	return;
                 	  } 
                 	  
                 	  var base, part, nso, ns = asGlobal?w:(base = {}),
                 	  nameParts=name.split('.');
                 	  
                 	  for(var i=0;i<nameParts.length;i++){
                 	  	  part=nameParts[i];
                 	  	  nso=ns[part];
                 	  	  
                 	  	  if(!nso){
                 	  	  	ns[part] = (nso = asGlobal? (new __Namespace(nameParts.slice(0,i+1).join('.'))) : {});
                 	  	  	 if(i==0 && asGlobal){
                 	  	  	 	 w.__rootNamespaces.push(nso);
                 	  	  	 	
                 	  	  	 }
                 	  	  	
                 	  	  } 
                 	  	  ns=nso;
                 	  	
                 	  } 
                 	  
                 	 if(asGlobal){ 
                 	       w.__namespaces[name] = ns;
                 	 }else{
                 	 	return base;
                 	 }
                 	
                 };
                 
                 Type.createEnum = function(){
                 	
                 };
                 
                 Type.hasRootNamespace = function(name){
                 	return !!w.__rootNamespace[name];
                 };
               
                 var Service = (function(){
                       // Private data
                       var _type = "single",
					       _transformToTrace = function(lns, fn, jump){
						        for(var i=0, len = lns.length; i < len; i++){
									if(lns[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)){
									       fn(lns[i], i);
										   if(jump) i++;
									}
							    }
						   },
                           makeNode = function(){
                                 return {data:null, next:null};
                           },
						   watchCount = function(ob){
                                 ob.count = ob.keys.length;
                                 if(!ob.isBound()){ // if the stack is outside its bounds
	                                     throw "::STACK_BOUNDS_ERROR - Cannot update stack object";
	                             }
                           },
                           updatePointer = function(ob){
                                 ob.pointer = ob.keys[0];
	                             watchCount(ob);
                           },
                           keyGen = function() {
                                   return ("00" + (Math.random()*Math.pow(10,4) << 0).toString(36)).slice(-4)
                           };
    

                        // Constructors
                        function StringBuilder(){
                        	var me = this,
							privateopts = {
                        		
                        	},
                        	settings = extendObj(privateopts, opts),
                            buffer = [];
    
    
                             me.append = function(string){
                                      buffer.push(string);
                                      return me;
                             }
    
                             me.appendBuffer = function(bufferToAppend){
                                  buffer = buffer.concat(bufferToAppend);
                             }
    
                             me.toString = function(){
                                      return buffer.join("");
                             }
    
                             me.getLength = function(){
                                    return buffer.length;
                             }
    
                             me.flush = function(){
                                    buffer.length = 0;
                             }
    
                        };
                        
                        function Stack(obj, limit){
                           // REM: a stack is a LIFO data structure
                           this.elements = []; // init assoc array OR linear hash table;
                           this.keys = [];
                           this.count = this.keys.length;
                           this.limit = (typeof limit == "number" && limit) || 10;
                           this.owner = obj || window.document;
   
                           this.pointer = null;
							
                        	var privateopts = {
                        		
                        	},
                        	settings = extendObj(privateopts, this);
                        	
                        	return (!(this instanceof Stack))? new Stack(arguments) : this;
                        }
                        
                        
                        Stack.prototype.peek = function(){
                                return this.elements[this.pointer];
                        }
   
                        Stack.prototype.push = function(value){
                                this.keys.unshift(keyGen()); // key to be generated randomly by a hash generator!!
		                        updatePointer(this);
		                        this.elements[this.pointer] = (value !== null && value); // creating linear hash table
		                        return this.count;
                        } 
   
                        Stack.prototype.pop = function(){
                                var item = this.elements[(this.pointer === this.keys.shift() && this.pointer)];
		                        updatePointer(this);
		                        this.elements.slice(1, this.count);
		                        return (item)? item : null;
                        }
   
                        Stack.prototype.empty = function(){
	                             this.elements.length = 0;
                        }
						
						Stack.prototype.isEmpty = function(){
						    return (this.elements.length === 0);
						}
   
                        Stack.prototype.duplicate = function(val){
                                 this.push(val);
	                             this.push(val);
                        }
   
                        Stack.prototype.swap = function(){
   
                        }
   
                        Stack.prototype.rotate = function(){
   
                        }
   
                        Stack.prototype.isBound = function(){
                             return (this.count >= 0 && this.count <= this.limit);
                        }

                        
                        function LinkedList(limit, type){
                               this.type = type || _type;
                               this.limit = limit || (1e+1000000000000);
                               this.start = null;
                               this.size = -1;
                        	 
							 var privateopts = {
                        		isSealed:false,
								isFrozen:false,
								isGenerator:false
                        	 },
                        	 settings = extendObj(privateopts, this);
                        	
                        	return (!(this instanceof LinkedList))? new LinkedList(arguments) : this;
                        }
                        
                        LinkedList.prototype.add = function(d){
                                if(!d || typeof d == "undefined"){
                                         return false;
                                }
                                if(!this.isEmpty()){
                                      this.end.next = makeNode();
                                      this.end = this.end.next;
                                }else{
                                      this.start = makeNode();
                                      this.end = this.start;
                                }
                                      this.end.data = d;
                                      ++(this.size);
                                      return true;
                        }

                        LinkedList.prototype.sort = function(uporder){ // uporder:Boolean->Ascending or Descending
                                var art = this.toArray(),
                                    len = art.length;
                                    art.sort(function(a, b){
                                          return (uporder? (a - b)  : (b - a) );
                                    });
                                    this.clear();
                                    this.fromArray(art);
                        };

                        LinkedList.prototype.fromArray = function(arr){
                                        var i = 0;
                                        while(i !== arr.length){
                                            if(!this.add(arr[i])){
                                                throw new Error("");
                                            }
                                            ++i;
                                        }
                                        i = null;
                        };

                        LinkedList.prototype.getSize = function(){
                                 return (this.size+1);
                        };

                        LinkedList.prototype.get = function(i){
                                 i = parseInt(i);
                                 var index = -1,
                                   current = this.start;
                                   while(current  != null){
                                        ++index;
                                        if(index != i){
                                              current = current.next;
                                        }else{
                                              break;
                                        }
                                   }
                                index = null;
                                return current.data;
                        };

                        LinkedList.prototype.remove = function(d){
                             if(!d || typeof d == "undefined"){
                                    return false;
                             }
                             var current = this.start,
                             previous = this.end.next;
    
                            while(current !== null){
                                if(d === current.data){
                                     // deal with the first node
                                     if(current === this.start){
                                          this.start.next = previous;
                                          this.start = current.next;
                                          return true;
                                     }
                                     if(current === this.end){
                                          this.end = previous;
                                     }
                                     previous.next = current.next
                                }
                                previous = current;
                                current = current.next;
                            }
                            return false;
                        };

                        LinkedList.prototype.isEmpty = function(){
                            return (this.start === null);
                        };

                        LinkedList.prototype.toArray = function(){
                               var arr = [],
                               current = this.start;
                               while(current !== null){
                                     arr.push(current.data);
                                     current = current.next;
                                }
                                return arr;
                        };
       
                        LinkedList.prototype.clear = function(){
                                var current = this.end.next;
                                while(current !== this.end){
                                      current = this.start;
                                      this.start = current.next;
                                      current.next = this.end.next;
                                }
                                this.start = null; // signal emptiness of the list
                                (this.size)=-1;
                        };
       
                        LinkedList.prototype.iterateWith = function(f, context){
                                 if(typeof f != "function"){
                                       throw new Error("invalid argument");
                                 }
                                 var i = 0, current = this.start;
                                 while(current !== null){
                                       f.call(context, current.data, i++);
                                       current = current.next;
                                 }
                        };

                        LinkedList.prototype.insertAsFirst = function(d){
                             // Need to make sure that {d} is not in the list to start with
                             if(this.remove(d)){
                                  throw new Error("Invalid operation on list ");
                             }
                             var temp = makeNode();
                             temp.next = this.start;
                             temp.data = d;
                             this.start = temp;
                        };

                        LinkedList.prototype.getLastIndex = function(){
                              return this.size;
                        };
       
                        LinkedList.prototype.insertAfter = function(t, d){
                              var temp,
                              current = this.start;
       
                              while(current !== null){
                                  if(current.data === t){
                                           continue;
                                  }
                              }
                        };

                        
                        function TreeNode(value){
                              this.isParent = false;  // every node starts out without having children
                              this.hasParent = false; // every node starts out without having a parent
                              this.value = value;
                              this.key = null; // may or may not be used (depends on client code use of the <TreeNode>)
                              this.isLeaf = true;
    
                              this.children = new LinkedList();
    
                              var privateopts = {
                                  isSealed:false,
								  isFrozen:false,
								  isGenerator:false
                              },
                              settings = extendObj(privateopts, this);
    
                              return (!(this instanceof TreeNode))? new TreeNode(arguments) : this;
    
                        }


                        TreeNode.prototype.addChild =  function(/* <TreeNode> */child){
                                if(child === null || !(child instanceof TreeNode)){
                                     throw new Error("TREE_ERROR: child is not valid <TreeNode>!");
                                }
    
                                if(child.hasParent){
                                     throw new Error("TREE_ERROR: child <TreeNode> already has a parent!");
                                }
    
                                if(!this.isParent){
                                      this.isParent = true; // Since the node has at least one child now, it is now a parent!!
                                      this.isLeaf = false; // Since the node has at least one child now, it cannot be a leaf!!
                                }
    
                                child.hasParent = true;
                                this.children.add(child);
                        }

                        TreeNode.prototype.getChildren = function(){
                                 return this.children.toArray();
                        }

                        TreeNode.prototype.childCount = function(){
                                 return this.children.getSize();
                        };

                        TreeNode.prototype.getChild = function(index){
                                 return this.children.get(index);
                        };


                        function Tree(value){
                              if(!value || typeof value == "undefined"){
                                    throw new Error("Invalid argument passed to <Tree>");
                              }
                              this.node = new TreeNode(value);
    
                              var privateopts = {
                                  isSealed:false,
								  isFrozen:false,
								  isGenerator:false
                              },
                              settings = extendObj(privateopts, this);
    
                              return (!(this instanceof Tree))? new Tree(arguments) : this;
                        }

                        Tree.prototype.attachTree = function(/* <Tree> */tree){
                              this.node.addChild(tree.node);
                        }

                        Tree.prototype.clone = function(){
                              var tree = new Tree(this.value);  
                                  tree.node = this.node; 
                                  return tree;
                        }

                        
                        
                        function Queue(){
                               // REM: a queue is a FIFO data structure
                               this.elements = new Array();
                               this.pointer = 0;

                        	var privateopts = {
                        		isSealed:false,
								isFrozen:false,
								isGenerator:false
                        	},
                        	settings = extendObj(privateopts, this);
                        	
                        	return (!(this instanceof Queue))? new Queue(arguments) : this;
                        };
                        
                        Queue.prototype.peek = function(){
                               return this.elements[0];    
                        };

                        Queue.prototype.dequeue = function(){
                               if(!this.isEmpty()){
                                    return (this.elements.shift());    
                               }else{ 
                                    throw Error("QUEUE_ERROR: Invalid Operation");
                               }
    
                        };

                        Queue.prototype.enqueue = function(element){    
                               this.elements.push(element);
                        };

                        Queue.prototype.isEmpty = function(){    
                               return (this.elements.length === 0); 
                        };

                        Queue.prototype.size = function(){
                               return (this.elements.length);    
                        };

                        Queue.prototype.empty = function(){ 
                               this.elements.length = 0;    
                               return this.isEmpty();
                        };


                        Queue.prototype.toArray = function(limit){   
                           return [].slice.call(this.elements, limit);    
                        };
                        
                        function BinaryHeap(){
						
						
                        	var privateopts = {
                        		isSealed:false,
								isFrozen:false,
								isGenerator:false
                        	},
                        	settings = extendObj(privateopts, opts);
                        
                        	return (!(this instanceof BinaryHeap))? new BinaryHeap(arguments) : this;
                        }
                        
                        function ModuleError(y) {
                            
                            this.name = 'ModuleError';
                            this.message = y;
                            this.stack = Error(y).stack;
                            this.framesToPop = 2;
                            
                            return this;
                        }
                        
                        function BackEndServiceError(o){
                            this.name = 'BackEndServiceError';
                            this.message = o;
                            this.stack = Error(o).stack;
                            this.framesTopPop = 1;
                            
                            return this;
                        }
                        
                        function Graph(){
                        	
                        }
                    
                      
                      BinaryHeap.prototype = {
                      	
                      }
					  
					  var ErrorInterface = {
					  
					      getStackTrace : function(){
						      var lines = null,
							      callStack = [],
								  currentFunction = null,
								  defaultt = [0, 'ananymous'],
								  fname = null,
								  stack = this.stack,
								  mssge = this.message,
							      isCallStackPopulated = false;
							  
							      if(stack){ // Firefox & Chrome
								     lines = stack.split('\n');
									 _transformToTrace(lines, function(line, key){
									        callStack.push(line);
									 });
									 // remove bottom trace
									 callStack.shift();
									 // set flag
									 isCallStackPopulated = true;
								  }else if(mssge){
								       if(window.opera){
									        lines = mssge.split('\n');
								             _transformToTrace(lines, function(line, key){
											      var entry = line;
                                                  if(lines[key+1]){
												      entry += ' at ' + lines[key+1];
												  }					
                                                  callStack.push(entry);												  
											 }, true);
											 // remove bottom trace
											 callStack.shift();
											 // set flag
											 isCallStackPopulated = true;
										}	 
								  }
								  
								  if(!isCallStackPopulated){ // IE & Safari
								       currentFunction = arguments.callee.caller;
									   while(currentFunction){
									       fname =  (rAllFunc.exec(currentFunction.toString()) || defaultt)[1];
										   callStack.push(fname);
										   currentFunction = currentFunction.caller;
									   }
								  }
								  
								  return callStack.join('\n\n');
						  }
					  }
                      
					  Error.prototype.getStackTrace = ErrorInterface.getStackTrace;
					  
                      ModuleError.prototype = Object.create(Error.prototype);
                      ModuleError.prototype.constructor = ModuleError;
					  
					  
                      BackEndServiceError.prototype = Object.create(Error.prototype);
                      BackEndServiceError.prototype.constructor = BackEndServiceError;
                        
                       var Service = function(mode){
                            this.mode = mode;
                            return this;
                       };
                          
                        // Static vars    
                       Service.MODERRORSRVC = 3;
                            
                       Service.BCKENDERRORSRVC = 2;    
  
                       Service.DATASTRUCTSRVC = {
                       	   Stack:-1,
                       	   LinkedList:-2,
                       	   Queue:-3,
                       	   Heap:-4,
                       	   Tree:-5
                       }
                
                       Service.provider = function(s){
                         
                            // provides error_messaging services and data structure services only
                            
                            switch(s){
                            	case -5:
                            	   return Tree;
                            	break;
                            	case -4:
                            	  return BinaryHeap;	
                            	break;
                            	case -3:
                            	  return Queue;	
                            	break;	
                            	case -2:
                            	  return LinkedList;	
                            	break;
                            	case -1:
                            	   return Stack;	
                            	break;
                            	case 0:
                            	   return null;	
                            	break;
                            	case 1:
                            	   return Graph;	
                            	break;
                            	case 2:
                            	   return BackEndServiceError;	
                            	break;	
                              case 3:
                                 return ModuleError;
                              break;
                            }
                
                       };
                               
                       return Service;
                
                }()),
               
                  // Borrowing from the CommonJS modules definition's spec...
                
                    rq,
                
                    df,
                
                    modules = {},
					
					eventsconfig = {"CACHE_EVENTS":{"onstore":{eventsSet:false,promiseReturned:false},"oncollect":{promiseReturned:false,promiseReturned:false}}}
                
                    widgets = {},
                    
                    resources = {},
                    
                    resourceSettings = {},
                
                    hasBeenBuilt = {},
                
                    requireGraph = [],
                
                    build = function(id, o){
                
                        var module, exports, factory;
                
                         if(modules[id]){
                
                                module = modules[id];
                
                                    if(modules[id].factory){
                
                                          factory = module.factory;
                
                                    }else{
                
                                           return true;
                
                                    };
            
                
                                    module.exports = factory.call(null, rq, o);
                
                                    delete module.factory;
                
                                    requireGraph.splice(requireGraph.indexOf(id), 1);
               
                
                           }else{
                
                               return false;
                
                           }
                
                    };
                
                    df = function(id, fn){
                
                               var local;
                
                               if(!(id in modules)){
                
                                   if(id.indexOf(".") > -1){
                
                                         local = Type.createNamespace(id);
                
                                   }else{
             
                                         local = {};
                
                                   }
                
                                   modules[id] = {exports:local, id:id, factory:fn};
                
                               }else{
                
                                      throw "Qarr define error due to: '"+id+" utility definiton already exists!'";
                
                                }
                
                    };
                
                    rq = function(id, bind){
                
                               var rgx, t, expose, temp = [];
               
			                   if(id.indexOf(":") > -1){
							        temp = id.split(":");
									id = temp[0];
							   }
               
                               if(modules[id]){
                
                                     if(requireGraph.indexOf(id) === -1 || !(modules[id].factory)){
                
                                           requireGraph.push(id);
                
                                     }else{
                
                                           requireGraph.reverse();
                
                                           t = "cycle in require graph: "+requireGraph.join("->")+"->"+id;
                
                                           requireGraph.length = 0;  // maintain the reference!
                
                                           delete modules[id];
                
                                           throw t;
                
                                     }
                
                                     if(modules[id].factory){
                
                                            hasBeenBuilt[id] = true;
                
                                      };
                
                                       build(id, bind);
               
                                       if(!bind){
									   
									      if(temp.length !== 2){
               
                                                 return modules[id].exports;
												 
										  }else{
										          
												 
											  return Object.each((modules[id].exports), function(val, key, obj){
												         var self = this; 
														
														  if(self.indexOf(key) > -1){
														 
														     return function(){
															 
															      return val.apply(obj, $sl.call(arguments));
																  
															 }
															 
														  } 
														 
														 return null;
														 
											  }, (temp[1]));
										  }		 
               
                                       }
               
                                       return null;
                
                                }else{
                
                                      throw "Qarr require error due to: '"+id+" utility module not found'";
                
                                }
                
                  };
             
             
                  df("executionEnvironment", function(a){
                     
                         "use strict";
                     
                         var g=!!(typeof w !== 'undefined' && doc && doc[cE]);
                     
                     
                         return {
                                canUseDOM: g,
                                canUseWorkers: typeof Worker !== 'undefined',
                                canUseEventListeners: g&&!!(onload),
                                canUseViewport: g&&!!w.screen,
                                isInWorker:!g
                          };
                     
                   });
				   
			 df("stringsearcher", function(p){
				           
					     "use strict";   
						
					     var U = p('utils:unique_array,multi_array'),
						
					     formatCallback = function(item, query, formatkey, splitQuery){
						     if(!!splitQuery){
							        Object.each(splitQuery, function(val, key){
								      item = item.replace(new RegExp(val+'(?!\<)','gi'), formatkey.join(val));
								  });
								  return item;
							 }else{
							     return item.replace(new RegExp('('+query+')', 'i'), function(original){
                                                    return (formatkey.join(original));
                                               });
							 }
					      },
						 
						getformatKey = function(format){
						     var formatMap = {
							   "italics":['<i>','</i>'],
							   "bold":['<b>','</b>'],
							   "underline":['<u>','</u>'],
							   "undefined":['',''],
							   "null":['','']
							 };
							 return formatMap[String(format)];
						};
						   
						return  {

						    edit_distance:function(){
								 /*
									## STRING-EDIT DISTANCE ##
									Prof. Vladamir Levenshtien (implementation of Levenshtien's distance algorithm - code coming soon)
								 */	
						    },
                            					 
							complete_string_diff:function(query1, query2, editcost){
							      /*
								    ## ##
								     Prof. Myer (implentaton of Myer's diff algorithm (for strings only) - code coming soon)
								  */
							},
							complete_string_patch:function(query1, query2){
							
							},
							// var fg = S.complete_char_search(["apple", "banana", "oranges", "avacardo", "pineapple"], "ap", "italics"); --> ["apple", "pineapple"]
							complete_char_search:function(items, query, format){ 
	                                                           var needle, chunks;
                                                                  if(query === void 0){
                                                                       query = ""; 
                                                                  } 
                                                                  if(query == ""){
                                                                       return items;  
                                                                  }
											chunks = (items||[]).filter(function(haystack){
													      needle = query.toLowerCase();
													      haystack = (haystack || "").toLowerCase();
														  var n = -1, i = 0, l;
														 
														   for(;l = needle[i++];){
																if(!~(n = haystack.indexOf(l, n+1))){
																		return false;
																}
														   }
													       return true;
											});
											return (!format)? chunks :  chunks.map(function(chunk){
											    return formatCallback(chunk, query, getformatKey(format), null);
											});
							},
							
							fuzzy_char_search:function(items, query, options, format){
							            // ##FUZZY STRING MATCHING##
										options = options || {};
										if(query && query == "*"){
										    return items;
										}
										var needles = (query || "").split(''), allMatch = !!options.allMatch, tip = (options.tip || ""), chunks;
										    // flatten the multi-dimesional array
									        chunks = ([].concat.apply([], needles.map(function(needle){
									                return items.filter(function(haystack){
											            needle = needle.toLowerCase();
													    haystack = (typeof haystack != "string" ? haystack[options.tip] : haystack.toLowerCase());
													    var l;
													    if(!~(l = haystack.indexOf(needle))){
													         return false;
													    }
													    return true;   
											        });
											})));
										    if(allMatch){
											    chunks = U.multi_array(chunks, tip); 
          									}else{
											    chunks = U.unique_array(chunks, tip);
                                            }
                                            return (!format)? chunks :  chunks.map(function(chunk){
											    return formatCallback(chunk, query, getformatKey(format), needles);
											});											
							},
	   
                            fuzzy_word_search:function(items, key){
											return function filter(query){
													var words = query.toLowerCase().split(" ");
															return items.filter(function(item){
																var normalizedTerm = (item[key] || item).toLowerCase();
																	 return words.every(function(word){
																		  return (normalizedTerm.indexOf(word) > -1);
																	 });
															});
											}
                            }

                        };
				   });
             
                   df("performance", function(r) {
                      
                           "use strict";
                                     
                            var g = r("executionEnvironment");
                                                
                            if (g.canUseDOM){
                                 var n=Date.now?Date.now():+new Date,r=(w.performance||w.msPerformance||w.webkitPerformance),t=[],a={},i=function(e,n){for(var r=0,a=t.length,i=[];a>r;r++)t[r][e]==n&&i.push(t[r]);return i},o=function(e,n){for(var r,a=t.length;a--;)r=t[a],r.entryType!=e||void 0!==n&&r.name!=n||t.splice(a,1)};r.now||(r.now=r.webkitNow||r.mozNow||r.msNow||function(){return(Date.now?Date.now():+new Date)-n}),r.navigation||(r.navigation={type:"_request"}),r.timing||(r.timing={"loadEventEnd":0,"responseEnd":0,"fetchStart":0,"redirectStart":0,"requestStart":0,"unloadEventStart":0,"unloadEventEnd":0,"connectStart":0,"connectEnd":0,"navigationStart":0}),r.mark||(r.mark=r.webkitMark||function(e){var n={name:e,entryType:"mark",startTime:r.now(),duration:0};t.push(n),a[e]=n}),r.measure||(r.measure=r.webkitMeasure||function(e,n,r){n=a[n].startTime,r=a[r].startTime,t.push({name:e,entryType:"measure",startTime:n,duration:r-n})}),r.getEntriesByType||(r.getEntriesByType=r.webkitGetEntriesByType||function(e){return i("entryType",e)}),r.getEntriesByName||(r.getEntriesByName=r.webkitGetEntriesByName||function(e){return i("name",e)}),r.clearMarks||(r.clearMarks=r.webkitClearMarks||function(e){o("mark",e)}),r.clearMeasures||(r.clearMeasures=r.webkitClearMeasures||function(e){o("measure",e)}); return r; // eslint-disable-line
                            }else{
                                 return null;
                            }

                   });
				   
				   
			 df("emitter", function(r){
				      
					"use strict";
						 
				      var handlers = {}, 
					  
						  reparate = function(array){
								 var obj = {};
								 Object.each(array, 
									 function(val){ 
										 this[val.name] = val.result;  
									 }, 
								 obj);
								 return obj;
						  },
						 
						  timers = {},
				 
				          queues = {},
				 
				          getDelay = function(num){
					          return Math.ceil(1 + Math.random() * num);
			              },
						  
						  normaliseScope = function(e){
						     return (e.indexOf('->', 0) > 0)? e.split('->', 2) : [];
						  };
						 
						    return {
						 
                                emit:function(evt){
								    
								    var scope, f=-1, res=[], nx, base = {}, set, data = [].slice.call(arguments, 1), ah = false;
									
									scope = normaliseScope(evt);
									
									if(scope.length){
									    evt = scope[0];
										scope[0] = String(ah);
										ah = handlers[evt];
									}else{
									    scope.push([]);
									    ah = handlers[evt];
								    }	
									
                                    if(ah){
                                        while(f < ah.length - 1){
										    f=f+1;
										    nx = ah[f]["name"];
										    if(!!scope[0][0]){
											   if(scope[1] === nx)
											        scope[0] = true;											  
											   else
                                                    continue; 	  
											}
                                            res.unshift({result:ah[f]["fn"].apply(ah[f]["cxt"], data), name:nx});
											if(res[0].result === null || typeof res[0].result === "undefined"){
											     res.shift();
											}
											if(scope[0] === true){
											    break;
											}
						                } 
                                    }else{
									   ;
									}
			                        f=0; 
									
									
									base[evt] = (res.length)? reparate(res) : null;
							        return base;
                                },
                                on:function(evt, callback, context){ 
                                      var name, self = this, scope = (evt.indexOf(":") > -1)? evt.split(":", 2) : evt;
                                        if(typeof evt != "string" || typeof callback != "function"){
			                                        return;
			                            }
										evt = (typeof scope === "string")? scope  : scope[1];
			                            // initialise (where necessary)
			                            if(!Object.keyExists(handlers, evt)){ 
                                                handlers[evt] = []; 
                                        }
										
										name = (Array.isArray(scope))? scope[0] : ""+handlers[evt].length; 
			  
			                            // capture all props for handler
			                            handlers[evt].push({
										        name:name,
			                                    cxt:context,
			                                    fn:callback,
					                            timestamp:(new Date).getTime() // just for sorting purposes... 
			                            });
			  
			                            // rearrange in order of entry/insertion
			                            handlers[evt].sort(function(a, b){
			                                   a.timestamp - b.timestamp;
			                            });
			  
                                        return self; // chaining
                                },
								once:function(evt, callback, context){
								
								},
                                has:function(evt){
                                        return (!evt)? !!evt : handlers.hasOwnProperty(evt);
                                },
                                poof:function(){
                                       handlers = {};
                                },
								emitList:function(events, data, context){
								      var result = {}, scope, ev;
								      if(Array.isArray(events)){
									      for(var d=0; d < events.length; d++){
										      ev = events[d];
										      scope = (normaliseScope(ev)[0] || ev);
										      result[scope] = this.emit(ev, data, context)[scope];
										  }	 
									  }	
                                      result;									  
								},
								queue:function(event, data){ 
											var self = this, queue = queues[event], event = event;
											
											if(Array.isArray(queue)){
											    ;
											}else{
											    queue = queues[event] = [];
											}
											
											queue.push(data);
											queue.lastLength = queue.length;
											queues[event] = queue;
											return {
												emitWhenFree:function(context){
												   var _self = this, evt = event, timer = timers[evt];
												   if(Array.isArray(timer) && timer.length){
													   ;
												   }else{
												       timer = timers[evt] = [];
												   }
												   
												   //console.log('llll ----- '+evt+' hhhhh ----- '+_self+' mmmmm '+data);
												   timer[timer.length] = setTimeout(function setup(){
														var tick = false, _queue = queues[evt];
														//console.log(_queue.lastLength+'queue '+_queue+'ppppppppp '+_queue.length);
														if(Array.isArray(_queue) && _queue.length){
															if(_queue.length === _queue.lastLength){
																_self.emit(evt, context, _queue.length);
																tick = true;
															}   
														}
														setup.delay = ((setup.delay * 2) || 500);
														if(Array.isArray(timers[evt]) && timers[evt].length)
														    timers[evt][timers[evt].length] = setTimeout(setup, (tick? getDelay(setup.delay) : getDelay(setup.delay = (setup.delay/2))));
												   }, 300);
												   timers[evt] = timer;						   
												},
												flush:function(){
													self.flush();
												},
												emit:function(evt, context, num){
												    var _queue = queues[evt];
													self.emit(evt, (_queue.shift()), context);
													_queue.lastLength = _queue.length;
													if(_queue.length === 0){
													     num = _queue.length;
														delete queues[evt];
													}else{
													    queues[evt] = _queue;
														queues[evt].splice(num, 1);
													}	
														if(timers[evt][num]){
														    clearTimeout(timers[evt][num]);
															timers[evt].splice(num, 1);
															console.log('e deeeeeeeey!');
															if(timers[evt] && timers[evt].length == 0){
														         delete timers[evt];
															}else{
															     timers[evt].splice(num, 1);
															}	 
														}  
													
												}
											}
								 },
								 flush:function(){
								      /* code coming soon */
								 },
                                 off:function(evt, target){
                                   var hj = [], self = this;
                                   if(handlers[evt]){
								       if(target === null || typeof target == "undefined"){
                                            delete handlers[evt];
									   }else{
									        Array.filter(handlers[evt], function(v, k){
											      if(v && v.name === target){
												      return (!!hj.push(k)); 
												  }
											});
									        Object.each(hj, function(v){
											       this.splice(v, 1);
											}, handlers[evt]);
									   }
                                            									   
                                   }
								   return self; // chaining
                                 }
                            };
				   
				   });
				   
				   df("sessstore", function(r){

							"use strict";
							
							
							
							return {
								 store:function(){
								 
								 },
								 collect:function(){
								 
								 },
								 drop:function(){
								 
								 }
							}
	               });
             
                   df("tools", function(r){
                      
                      "use strict";
                      
                      var JSON = w.JSON || {},
					      Loc = w.location;
                      
                       return {
					   
					         is_node:function(o){
                                    return o && o[oD] && o[nT] && o[nT] > 0;
                             },
							 
                             add_event:function(evt, fn, ctx){
							       doEvent(evt, fn, ctx);
							 },
							 
							 get_origin:function(){
							      return (Loc.origin || Loc.prototcol + "//" + Loc.host);
							 },
							 
							 remove_event:function(evt, fn, ctx){
							     undoEvent(evt, fn, ctx);
							 },
							 
							 next_element : function(elem){
									 var nr = elem.parentNode, n = elem.nextSibling;
									if (n && nr.childNodes.length > 1){ 
										while (n !== null) {
											if (n.nodeType == 1) return n;
											if (n.nodeType == 3) n = n.nextSibling;
											if (n.nodeType == 9) return n.children.item(0).ownerDocument;			
										}
										return null;
									}
	                         },
							 
							 prev_element : function(elem){
									if(!this.is_node(elem)){
										  return null;
									}
									var pr = elem.parentNode, n = elem.previousSibling;
									if (n && pr.childNodes.length > 1){ 
										while (n !== null){
											if (n.nodeType == 1) return n;
											if (n.nodeType == 3) n = n.previousSibling;
											if (n.nodeType == 9) return n.children.item(0).ownerDocument;			
										}
										return null;
									}			
							 },
							 trigger_event : function(target, eType, detail, globale){
									   // the target must be a DOM node
									   if(!this.is_node(target)){
										  return null;
									   }
										var t, evt = (('CustomEvent' in globale) && !globale.document.documentMode ? new CustomEvent(eType) : globale.document.createEventObject()),
											dispatch = target[ (globale.document.documentMode || (globale.document.execScript && String(globale.document.execScript).indexOf("native") > -1)) ? "fireEvent" : "dispatchEvent" ];
							 
									   if(typeof detail === "object"){
											// set expando properties on event object
											for(t in detail){
											   if((({}).hasOwnProperty.call(detail, t))){
												   evt[t] = detail[t];
											   }
											}
									   }
									   // Actually, including support for IE6 here ;)
									   dispatch.apply(target, ((((globale.attachEvent || {}).toString()).indexOf("native") > -1) ? ["on"+eType , evt] : [evt])); 
									   return true;
						     },
							 
							 to_html_entities:function(str) {
                                   var div = d[cE]('div'),
                                       text = d[cTN](str);
                                       div[aC](text);
                                       return div.innerHTML;	
                             },
							 
							 str_camelize : function(str, delim){
                                      var rx = new RegExp(delim+"(.)","g");
                                      return s.replace(rx, function (m, m1){
                                             return m1.toUpperCase()
                                      });
                            },
							
							get_root_url : function(){
                                  var rootUrl = d.location.protocol+'//'+(d.location.hostname||d.location.host);
                                    if (d.location.port||false) {
                                         rootUrl += ':'+document.location.port;
                                    }
                                    rootUrl += '/';
                                    return rootUrl;
                            },

                            str_decamelize :function(str, delim){
                                return str.replace(/([A-Z])/g, delim+"$1").toLowerCase();
                            },

                            clone:function(obj){ 
							        var res; 
									    if(obj){ 
									        switch(this.type(obj).substring(0, 3)){
 										         case "arr": 
												    res = $sl.call(obj); 
												 break; 
												 case "obj": 
												    res = extendObj({}, obj, true); 
												 break; 
												 case "str": 
												   res = new String(obj);  
												 break; 
												 case "num": 
												    res = new Number(obj);
		 										 break; 
												 case "fun": 
												    res = (new Function(" return ("+String(obj)+")"))(); 
												 break;
												 case "boo": 
												    res = new Boolean(obj); 
												 break; 
												 default: 
												    res = new Object(obj); 
												 break;  
											}  
									    } return res; 
							},
							eval_script:function(cod){ 
							       var evl = (w.execScript && w.execScript.bind(w) || (function(d){ return (w["eval"].call(w, cod) || new Function("return ("+cod+")")); }));  if(!/\.js$/i.test(cod)){ return evl(cod.trim()); } },
                            is_empty_obj:function(ob){ 
							        for(var t in ob){ return false; } return true;
							},           
                            is_simple_obj:function(ob){ 
							     if(!ob) return false;  
								     return (!!ob.constructor && !$h.call(ob, 'constructor') && String(ob).indexOf('Object]') == 8); 
							},
							is_doc_node:function(c){
							         return (c && (this.eval_script(c)).nodeType && (this.eval_script(c)).nodeType === d.nodeType); 
							}, 
							
                            is_window:function(g){ 
							        return (g && (g.frames || g.frameElement || g.window)!==null && w["eval"].call(w, g) === w); 
							},
							
							deflate:function(obj, x){ 
							    var i, enms, remove = function(o, xs){
								     if(Array.isArray(o)){
									    o.splice(Number(xs), 1);
									 }else{
									    delete o[xs];
									 }
								}; 
								if(this.type(obj) == "object"){ 
								    if(x && this.type=="string"){ 
									     remove(obj);  
								    }else{ 
									    enms = (obj.toString["$$enums"] || []);
									    for(i=0; i < enms.length;i++) 
										      if($h.call(obj, enms[i]))
										              remove(obj, enms[i]);  
								    } 
								}
							 },
							 
                             inflate:function(obj, obj2, deep, trans){
							       var k;
                                   if(typeof obj2 === "object"){
								        obj2.toString = function(){
										     return (Array.isArray(this)? ([]).toString() : ({}).toString());
										}
										obj2.toString["$$enums"] = Object.keys(obj2);
								   } 							 
							       k = extendObj(obj, obj2, deep, trans);
								   return k;
							 }, 
							 
                             is_node_disconnected:function(obj){
                                    return (obj && this.is_node(obj) && obj[oP] !== undefined && obj[oP] === null); 
                             },     

                             is_win_fullscreen:function (){
                                   return w.screen.height === (d[dEm].scrollHeight) && w.screen.width === (d[dEm].scrollWidth);
                             },
							 
                             get_window_center_position:function(a, b) {
                                           var c, d, e;
                                           isIE ? (c = w.screenLeft, d = "undefined" !== typeof w.screen.availWidth ? w.screen.availWidth : w.screen.width, e = "undefined" !== typeof w.screen.availHeight ? w.screen.availHeight : w.screen.height) : (c = "undefined" !== typeof w.screenX ? w.screenX : w.screenLeft, d = "undefined" !== typeof w.outerWidth ? w.outerWidth : doc.documentElement.clientWidth, e = "undefined" !== typeof w.outerHeight ? w.outerHeight : doc.documentElement.clientHeight - 22);
                                           c = parseInt(c + d / 2 - a / 2, 10);
                                           e = parseInt(0 + (e - b) / 2.5, 10);
                                           return "left=" + c + ",top=" + e;
								
                             },
                             mirror_object : function(){
							 
							 },
							 markup_to_dom :(function(){
                                    var div = doc[cE]('div');
                                    return function(html){
                                          div.innerHTML = html;
                                          var elem = div.firstChild;
                                          div.removeChild(elem);
                                          return elem;
                                    };
                             })(),
							 json_to_query:function(json, temp, prefixDone){
							           var self = this,
									    uristrings = [],
                                        prefix = '&',
                                        add = function(nextObj, i){
                                           var nextTemp = temp 
                                                ? (/\[\]$/.test(temp)) // prevent double-encoding
                                                ? temp
                                                    : temp+'['+i+']'
                                                      : i;
                                          if ((nextTemp != 'undefined') && (i != 'undefined')) {  
                                              uristrings.push(
                                                 (typeof nextObj === 'object') 
                                                    ? self.json_to_query(nextObj, nextTemp, true)
                                                       : ($s.call(nextObj) === '[object Function]')
                                                          ? encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj())
                                                            : encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj)                                                          
                                             );
                                          }
                                       }; 

                                      if (!prefixDone && temp) {
                                           prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? '' : '&' : '?';
                                           uristrings.push(temp);
                                           uristrings.push(self.json_to_query(json));
                                      } else if (($s.call(json) === '[object Array]') && (typeof json != 'undefined') ) {
                                          // we wont use a for-in-loop on an array (performance)
                                          for (var i = 0, len = json.length; i < len; ++i){
                                                  add(json[i], i);
                                          }
                                      } else if ((typeof json != 'undefined') && (json !== null) && (typeof json === "object")){
                                          // for anything else but a scalar, we will use for-in-loop
                                          for (var i in json){
                                                  add(json[i], i);
                                          }
                                      } else {
                                           uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(json));
                                      }

                                       return uristrings.join(prefix)
                                                   .replace(/^&/, '')
                                                      .replace(/%20/g, '+'); 

							 },
		                     query_to_json:function(query, asParsed){
		              	            var t=0, part = [], jstr ="{";
		              	                   query = query || "";
		              	                   if(typeof query !== "string"){
		              	    	                 return;
		              	                   }
		              	                   query = query.trim().replace(/\?|\;/,"");
		              	                   query = !!query.length? query.split("&") : part;
		              	    
		              	                   while(query.length != t){
		              	    	               part = query.shift();
		              	    	               part = part.split("=");
		              	    	               jstr += "\""+part[0]+"\":\""+unescape(part[1])+"\""+(query.length!=t? "," : "}")
		              	                   }
		              	    
		              	                   return (asParsed)? this.json_parse(jstr) : jstr ;
		                    },			 
			                import_css_file:function(cfile){
                                                var url = doc.location.href,
                                                prtc = (doc.location.protocol === "https:"),
	                                            indx = prtc ? 7 : 6,
                                                baseURL = url.substring(0 , url.indexOf('/', indx+1));
                                                if(doc.createStyleSheet) {
                                                     doc.createStyleSheet(baseURL+cfile);
                                                }else {
                                                     var styles = "@import url('"+ baseURL+cfile +"');";
                                                     var newSS=doc[cE]('link');
                                                      newSS.rel='stylesheet';
                                                      newSS.href='data:text/css,'+escape(styles);
                                                      doc[gETN]("head")[0].appendChild(newSS);
                                                }
                            },
                            get_class_nodes: function(){
							
							},
							get_name_nodes:function(){
							
							},
                            open_window:function(a, b, c, f){
                                 var d, e;
                                 "undefined" === typeof f && (f = "menubar=0,toolbar=0,resizable=0,width="+((c && c[0]) || '960')+",height="+((c && c[1]) || '710')+",scrollbar=0");  // '678'
                                 d = f.split("width=")[1].split(",")[0];
                                 e = f.split("height=")[1].split(",")[0];
                                 f = f + "," + this.get_window_center_position(d, e);
                                 if ((a = w.open(a, b, f)) && a.focus)
                                    return a.focus(), a;
                            },	
                            sprintf:function(h) {
                                    for (var i = [], j = 1, k = arguments.length; j < k; j++)
                                    i.push(arguments[j]);
                                    var l = 0;
                                  return h.replace(/%s|%d/g, function(m){
                                       var e = i[l++];
                                        if(m == '%d' && typeof e == "number"){
                                                   return e;
                                        }else if(m == '%s' && typeof e == "string"){
                                                   return e;
                                        }
                                        return 'e';
                                  });
                            },
							type:function(obj){
                                    var regz = /\[object\s{1}(\w+)\]/;
                                    if(obj) return $s.call(obj).match(regz)[1].toLowerCase();
                            },
							strip_tags:function(htmlstr){
							    var hold; 
								if(typeof(htmlstr) == "string")
								      hold = htmlstr.replace(/<.*?>/ig, "").replace(/<\/.*>/ig,"");
									 
							    return String(hold);
							},
                            get_head:function() {
                                 return (doc[gETN]("head") || [null])[0] || (doc[gETN]("body") || [null])[0] || doc[gETN]("script")[0].parentNode;
                            },
							html_entitify:function(h){
							     var txa = doc[cE]("textarea");
								 if(txa.insertAdjacentHTML){
								    txa.insertAdjacentHTML("afterbegin", h);
									return txa.innerHTML;
								 }
							},			
							css_matches:function(e, s){
							     if(e && e.matchesSelector){
								     return e.matchesSelector(s);
								 }else if(e.matches){
								     return e.matches(s);
								 }
							},	
                            json_stringify: function(d){ 
							    var t = !d? null : d;
							    return (typeof JSON.stringify == "function")?  JSON.stringify(t) : t + 1;
                            },  
                            json_parse: function(d){ 
							     var t = !d? "null" : d; 
							     return (typeof JSON.parse == "function")?  JSON.parse(t) : (new Function("return "+t))(); // this is always called in the context of the window 
                            },
                            get_time_string:function(type){ // If you pass "MMDDYY" you can get the full date.
                                  var today_date = new Date();
                                    var date_str;
                                     var timeMarker;
                                     var timeMinute;
                                        if (today_date.getHours() < 12) {
                                               timeMarker = "AM";
                                        }else{
                                               timeMarker = "PM";
                                        }
                                        if (today_date.getMinutes() < 10) {
                                              timeMinute = "0" + today_date.getMinutes();
                                        }else {
                                              timeMinute = today_date.getMinutes();
                                        }
                                        if (type == "MMDDYY") {
                                              date_str = ((today_date.getMonth() + 1) + "/" + today_date.getDate() + "/" + today_date.getFullYear() + " - " + today_date.getHours() + ":" + timeMinute + " " + timeMarker);
                                        }else{
                                              var mseconds = String(today_date.getMilliseconds());
                                                if(mseconds.length < 2) {
                                                    mseconds += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                                }else if(mseconds.length < 3) {
                                                    mseconds += "&nbsp;&nbsp;";
                                                }
                                                var seconds = today_date.getSeconds().toString();
                                                if(seconds.length == 1) {
                                                       seconds = "0" + seconds;
                                                }
                                            date_str = (today_date.getHours() + ":" + timeMinute + ":" + seconds + ":" + mseconds + " " + timeMarker);
                                        }
                                        return date_str;
                            },
                            xml_parse:function(markup, isX){
                            	var xmlDOM, domParser;
									    
										xmlDOM = CreateMSXMLDocument();
									
                                        if(xmlDOM){		
										
										     xmlDOM.async=true;
                            	       	     xmlDOM.loadXML(markup);
                            	       	     if(isX){ 
											      xmlDOM.setProperty('SelectionLanguage','XPath');
										     }
											 
                            	       	}   
								
                                       if(!xmlDOM){								 
                            	       	
                            	            if(w.DOMParser){
                            	       	      
                            	       	      	    domParser = new w.DOMParser();
													try{
                            	       	      	        xmlDOM = domParser.parseFromString(markup, 'text/xml');
													}catch(ex){
													    xmlDOM = domParser.parseFromString("<parseerror><errorcode>-1</errorcode><reason>Unknown Error</reason></parseerror>", 'text/xml');
													}	
                            	       	    
                            	            } 
									   }
									   
                            	       domParser = null;
                            	       return xmlDOM;
                            	
                            },                            
                            create_xml_doc: function(rootName, nodeText){
                            	rootName = rootName || "";
                            	var rootNode, xmlDoc = null;
                                if (d.implementation && d.implementation.createDocument) {
                                      xmlDoc = d.implementation.createDocument("", rootName, null);
									  try{ // trap Document Syntax Error 
									     if(xmlDoc)
  									        xmlDoc.documentElement.innerHTML = nodeText;
									  }catch(ex){}	  
                                }
								 
								if(!xmlDoc){
									    xmlDoc = CreateMSXMLDocument();
                                        if(xmlDOM && rootName){
                                                   rootNode = xmlDoc.createElement(rootName);
												   if(nodeText){
												      rootNode.appendChild(xmlDoc.createTextNode(nodeText));
												   }
                                                   xmlDoc.appendChild(rootNode);
                                        }
								}
								
								if(nodeText){
								   ;
								}
								
                                return xmlDoc;
                            },
			                dom_to_json:function(xmlDoc, escapeSpecials){
  
                                  var result, 
								      depth = 0, 
									  Allwhitespace = /^(?:[\s]*)$/, 
									  json="", 
									  jsonstart="{ ", 
									  jsonend=" }", 
									  separator=",", 
									  atrprefix = '"$attrs":{', atrsuffix = '}', 
									  comments = [], 
									  text = [], 
									  attr=[];

                                      function TraverseByCallback(n_arr, root, callback){  // only element nodes involved!  

                                           if(n_arr.length > 0){
										       // flatten array of XMLDOM/HTMLDOM nodes if the array is not empty
                                               n_arr = [].concat.apply([], n_arr); 
                                           }
										   
                                           var children = (root.childNodes || []), 
										       u = 0, 
											   child, 
											   levl = (Number(callback.requestLevel) || 0), len;
      
                                               json+='"'+root.nodeName.toLowerCase()+'":';

                                               if(children !== null){
                                                      children = [].slice.call(children);
                                                      len = children.length;
                                                      json+=jsonstart.trim();
                                                       if(typeof callback == "function" && (callback(root.attributes) === true)){ // collect all attributes on [child] + [callback] must return literal true;
           	                                                n_arr.push(root);
                                                       }
                                                       if(len){
                                                           for(;child = children[u]; u++){
                                                                if(child && child.nodeType){ // need to make sure to avoid : object maynot be a DOM Node OR DOMException -> HierarchyRequestError (in some cases - webkit)
             	 
                                                                    if(child.nodeType === 1){ // we found an element node!! "#element"
                                                                        if(child.hasChildNodes()){ // descend only when we have children
                          	                                                 ++depth;
                          	                                                 n_arr.push(child); // collect on children 
                                                                        }
                                                                        json+=separator; // add the separator to demacate each child
                                                                        TraverseByCallback(n_arr, child, callback); // recurse again!!
                                                                    } 
                                                                    if(child.nodeType === 8){  // we found a comment node!! "#comment"
                                                                          comments.push(child.nodeValue);
                                                                    } 
                                                                    if(child.nodeType === 3){ // we found a text node!! "#text"
                                                                            if(!Allwhitespace.test(child.nodeValue)){
                                                                                 json+=separator;
                                                                                 text.push(child.nodeValue.replace(/([\t\r\n\b]+)/g, ""));
                                                                                 json+='"' + (child.nodeName.replace(/^\#/, "$")) + '":"' + (escapeSpecials? child.nodeValue.replace(/(["'&~<>])/g,"\\\$1") : child.nodeValue ) + '"';
                                                                            }
                                                                    }
                                                                    if(child.nodeType === 10){ // we found a doctype node - Not so good!! "#doctype"
                                                                            continue; // simply ignore...
                                                                    }   
                                                                }
                                                                if((u+1) === len){
	                                                                  json+=jsonend.trim();
                                                                }
                                                            }
                                                        }else{
	                                                          json+=jsonend.trim();
                                                        }
                                               }else{ 
                                                      if(root.nodeType !== 9){ // make sure it's not a document!!
                                                            n_arr.push(root);
                                                      }   
                                               }

                                            return [json, n_arr, comments, text, attr]; // base case scenario!
                                       }

                                    function readAttr(attrs){
	                                     var len = attrs.length, atr, val;
	                                         json+=atrprefix;
	                                         for(var t=0; t < len;t++){
	                                             	atr = attrs[t]; 
													val = atr.nodeValue.replace(/[\r\n\f\b\t]+/, '');
													if(val.indexOf('\\') > -1){
														if(!!val.match(/\\(?=[a-z0-9])/))
														      val = val.replace(/\\/g, '/');
													}
	                                                json+= (atr.specified)? '"' + atr.nodeName.replace(/\s+/, '') + '":"' + unescape(val) + '"' : '"null":null';
	                                                if((t+1) != len){
	                                                     json+=separator;
	                                                }
	                                                attr.push(atr);
	                                         }
	                                         json+=atrsuffix;
                                             // for IE ... we need to take away nulls due to the fact that
											 // IE7/8 always return all possible attributes... specified or not!
	                                         return true;
                                    }

                                    result = TraverseByCallback([], xmlDoc.documentElement, function(nodes){
	                                               return readAttr(nodes);
                                    });

                                    result[0] = (jsonstart+(result[0])+jsonend)

                                    return result;

                            },
                            is_obj: function(a) {
                                return null !== a && "object" === typeof a
                            },
							is_func:function(a){
							    return null !== a && "function" === typeof a
							},
                            str_replace:function(a, b, c) {
                                   return a.split(b).join(c)
                            },
                            json_escape_string:function(a){
                                  var b, c, d = [   
                                     [/\\/g, "\\\\"],
                                     [/\t/g, "\\t"],
                                     [/\n/g, "\\n"],
                                     [/\f/g, "\\f"],
                                     [/\r/g, "\\r"],
                                      [/\x08/g, "\\b"],
									  [/\"/g, '\\"'],
                                      [/\x09/g, "\\t"],
                                      [/\x0a/g, "\\n"],
                                      [/\x0c/g, "\\f"],
                                      [/\x0d/g, "\\r"]
                                      ];
                                     for (c = 0; c < d.length; c += 1)
                                           b = d[c], a = a.replace(b[0], b[1]);
                                                 
                                     return a = a.replace(/[\x00-\x07\x0b\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function(a) {
                                                               return "\\u" + ("0000" + ( + a.charCodeAt(0)).toString(16)).slice(-4)
                                     });
                            }
                      
                      };
                   
                   });
               
                   df("utils", function(r){
                      
                       "use strict";
                  
                    return {
					
                      is_even:function(num){
                            return (!this.is_nan(parseInt(num)))? (num % 2) === 0 : false;
                      },
                      is_url:function(url, ext){
                           var match = UriRgx.exec(url);
                           return (ext && typeof ext == "string")? match && match[4] === "."+ext : match[0] === url;
                      },
                      parse_url:function(a) {
                           a = UriRgx.exec(a);
                           for (var d = {}, c = 14, b = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" "); c--;)
                           d[b[c]] = a[c] || "";
                      
                           d.queryKey = {};
                           d[b[12]].replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(a, c, b) {
                                       c && (d.queryKey[c] = b)
                                       });
                           return d;
                      },
					  
                      in_array:function(arr, tgt){
                           var i;
                           for(i in arr){
                              if(tgt === arr[i]) return true;
                           }
                           return false;
                      },
					  
                      get_all_indexof : function(str, c){
                             var f = [-2]; // the start index is -2(since -2+1 should give us a good start index for 'indexOf' method!!)
                               function loadArrayWithIndex(_str, _c, _f){
                                    var dice = _f.length - 1, index = _f[dice], radix = _str.indexOf(_c, index+1);
                                        if(radix > -1){ // check to see if we found [_c]
                                            _f.push(radix); // if true,  fill up the array with the index at which [_c] was found
                                            return loadArrayWithIndex(_str, _c, _f); // recurse again...
                                       }else{
                                            return _f.splice(1,_f.length - 1); // base case scenario for recursive calls...
                                       }
                                }
                                return loadArrayWithIndex(str, c, f);	// begin recursive calls...
                      },
					  // remove multi occuring items from array 
                      unique_array:function(ar, t){
                                var a, i, j, c, m;
                                a = [];
                                o: // label 'o'
                                  for (i = 0; i < ar.length; ++i) {
                                        for (j = 0; j < a.length; ++j){
										     c = !!t? a[j][t] : a[j];
											 m = !!t? ar[i][t] : ar[i];
										     if (c == m) continue o
										}	 
                                        a.push(ar[i]);
                                  }
                                return a;
                      },
					  // remove single ocurring items from array
					  multi_array: function(ar,  t){
					            var a, b, n, k, v, x;
								a = [];
								b = [];
								for(var k=0;k < ar.length; k++){
								     for(n = 0;n < a.length; n++){
									       v = !!t? a[n][t] : a[n];
										   x = !!t? ar[k][t] : ar[k];
									       if(v == x){
									            b.push(a[n]);
									       }
									 }
                                     a.push(ar[k]);									 
								}
							return b;	
					  },
					  
                      reverse_string:function(initstr){
                                var rev = "";
                                if(this.type(initstr) === 'string'){
                                      for(var s = (initstr.length - 1); s >= 0; s--){
                                           rev += initstr[s];
                                      }
                                     return rev;
                                 }
                                 return rev;
                      },
					  
                      type:function(obj){
                             var regz = /\[object\s{1}(\w+)\]/;
                             if(obj) return $s.call(obj).match(regz)[1].toLowerCase();
                      },
					  
                      splitify:function (list, delim, len, pair){
                             //if(delim && delim.length > 1) throw new Error("splitify: argument 2 must be of type char");
                             delim = String(delim);
                      
                             list = list+(delim || '');
                             len = len || list.length;
                             var  findex = list.indexOf(delim),
                             lindex = list.lastIndexOf(delim),
                             ints,
                             start = 0,
                             sublen,
                             substrs  = null,
                             hlist = [];
                      
                             switch(delim){
                                case "null":
                                case "":
                                for(;;){
                                     if(pair !== undef){
                                           hlist.push(list.substring(w.Math.min(len, start), (start+=pair))); // split only using {pair}
                                     }else{
                                           //hlist.push(list.charAt(start++)); // split characters
                                           hlist = list.split("");
                                     }
                      
                                     if(start == len)
                                           break;
                                     }
                                     break;
                      
                                     default:
                                         while(findex < lindex){
                                              substrs = list.substring(start, findex);
                                              ints = hlist.push(substrs);
                                              start = findex + 1;
                                              findex = list.indexOf(delim, start);
                                              if(ints == (len - 1)) break;
                                         }
                                         hlist.push(list.substring(start, findex));
                                         break;
                             }
                      
                            return hlist;
                      },
					  
                      handle_query:function(aspect,url){
                               // variable hoisting
                               url = url || doc.location.search;
                      
                               if(typeof(aspect) == "string"){
                                          url = url.replace(/^\?/,"");
                                          var q = url.split("&");
                                             for(var k=0; k < q.length; k++){
                                                   if(q[k].indexOf(aspect) != -1)
                                                         return w.decodeURIComponent(q[k].substring(q[k].indexOf("=")+1));
                                             }
                               }
                      
                               return null;
                      },
					  
                      add_hex:function(c1, c2, len){
                              var hexStr;
                              len = len || 0;
                              if(typeof c2 == "string")
                                     hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
                              else
                                     hexStr = (parseInt(c1, 16)+ 0x01).toString(16);
                      
                               while (hexStr.length < len) { 
							       hexStr = '0' + hexStr; // Zero padding.
							   } 
                                          return hexStr;
                      },
					  
                      from_hex:function(hex, base){
                                if(!/^([0-9a-fA-F]+)$/.test(hex)) return 0;
                                    return (0x000000 | parseInt(hex , (base || 16)));
                      },
					  
                      from_rgba:function(rgbcolor, opac){
                              if(rgbcolor.indexOf('#') == 0) return rgbcolor;
                              var rgx = /^rgba?\(((?:[\d]{1,3}(\,)?)+)(\d*\.\d+)?\)$/,
                              match = (rgbcolor.match(rgx)[1]).split(','),
                              rgb = '#' + 
                                  this.from_decimal(match[0], 16) +
                                  this.from_decimal(match[1], 16) +
                                  this.from_decimal(match[2], 16) +
                                  '';
                      
                              return rgb;
                     },
					 
                     sub_hex:function(c1, c2, len){
                                var hexStr;
                                len = len || 0;
                                if(typeof c2 == "string")
                                       hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
                                else
                                       hexStr = (parseInt(c1, 16)+ 0x01).toString(16);
                      
                                 while (hexStr.length < len) { hexStr = '0' + hexStr; } // Zero padding.
                                        return hexStr;
                     },
					 
                     to_hex:function(bi, limit){
                                return b.Math.max(0, b.Math.min(b.parseInt(bi, 16), (limit || 255)));
                     },
					 
                     to_rgba:function(hexcolor, opac){
                      
                                  var regex = /^\#([a-fA-F0-9]+)$/,
                                  match = hexcolor.match(regex),
                                  rgba = "";
                      
                                  if(type(match) != "array") return;
                      
                                        match = this.splitify(match[1], "", null, 2);
                      
                                       rgba = ((opac)? "rgba(" : "rgb(") + 
                                                this.to_hex(match[0]) + "," + 
                                                this.to_hex(match[1]) + "," + 
                                                this.to_hex(match[2]) + ((opac)? ","+opac : '') + ")";
                      
                                 return rgba; 
                     },
                     
					 to_binary:function(basenum){
                            if(typeof(basenum) == 'number'){
                                 var remainder = [], i = 0, quot = basenum;
                                
								 do{
                                   remainder[i] = Math.floor(quot % 2);
                                   quot = quot / 2;
                                   i++;
                                 }while(quot >= 1);
                                       
							     return remainder.reverse().join('');
                            }
                      },
					  
                      create_32binary_string:function(nMask) {
                               for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32; nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
                               return sMask;
                      },
					  
                      add_bin:function(/* Varargs */){
                                 var t = sum = 0, vlp=[];
                                 for(; t < arguments.length; t++){ 
                                        vlp[t] = parseInt(arguments[t], 2);
                                        sum += vlp[t];
                                 }
                                 return parseInt(this.to_binary(sum), 2);
                      },
					  
                      low_decipher:function(hashtext){
                                   var keylength = hashtext.length,
                                   plaintext = '', index = '', point = '', b = 1;
                      
                                   for(; b < hashtext.length;b++){
                                            if(this.is_even(b)){
                                                  index = pkey.indexOf(hashtext.charAt(b));
                                                  point = (index > -1)? index + 3 : -1;
                                                  plaintext += (!!pkey.charAt(point)) ? pkey.charAt(point) : pkey.charAt(pkey.length-1) ;
                                            }
                                    }
                                    return plaintext;
                      },
					  
                      low_encipher:function(plaintext){
                                      var plaintext = plaintext || null;
                                      if(!plaintext) return;
                                      var textlength = plaintext.length, pset = (textlength+1),
                                      charArray = (this.get_random(true, pset)).split(''),
                                      validkey = this.reverse_string(pkey), hashstr = '', index = '',
                                      u = 0, point = '', AP = function(n){ -1 + (((++n) - 1) * 2) };
                      
                                      for(;u < pset; u++){
                                            index = validkey.indexOf(plaintext.charAt(u));
                                            if(!(this.is_even(Math.abs(AP(u)))) && !!charArray.length)
                                            hashstr +=  charArray.shift();
                      
                                         if(u < textlength && index){
                                            point = (index > -1)? index + 3 : -1;
                                            hashstr +=  (!!validkey.charAt(point)) ? validkey.charAt(point) : validkey.charAt(3);
                                         }
                                      }
                                      return hashstr;
                      },
					  
                      encodify:function(input, asHex){
                      var hex="",r=0,l = (typeof input == "string") && input.length;
                      while(r < l){
                      
                      // if(/[\/\\@\#]/.test(input.charAt(r))){ ; }
                       
                      hex+= (asHex?'\\x':'\\u') + input[r].charCodeAt(0).toString(16).toUpperCase();
                      r++;
                      }
                      hex = (this.is_url(input))? unescape(hex).replace('\\x','%').replace("%20", "+") : hex;
                      return hex;
                      },
                      camelize:function(str, delim){
                           var rx = new RegExp(delim+"(.)","g");
                           return str.replace(rx, function (m, m1){
                                       return m1.toUpperCase();
                            });
                      },
                      decamelize:function(str, delim){
                          return str.replace(/([A-Z])/g, delim+"$1").toLowerCase();
                      },
                      base64_encode : w.btoa || function(encode, asImage){
								  var input = encode;
								  var base64 = "";
								  var hex = "";
								  var chr1, chr2, chr3 = "";
								  var enc1, enc2, enc3, enc4 = "";
								  var i = 0;
								  var src = "data:image;base64,";
								  
								  do {
								  chr1 = input.charCodeAt(i++);
								  chr2 = input.charCodeAt(i++);
								  chr3 = input.charCodeAt(i++);
								  
								  enc1 = chr1 >> 2;
								  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
								  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
								  enc4 = chr3 & 63;
								  
								  if (this.is_nan(chr2)) {
								  enc3 = enc4 = 64;
								  } else if (this.is_nan(chr3)) {
								  enc4 = 64;
								  }
								  
								  base64  = base64  +
								  b64array.charAt(enc1) +
								  b64array.charAt(enc2) +
								  b64array.charAt(enc3) +
								  b64array.charAt(enc4);
								  chr1 = chr2 = chr3 = "";
								  enc1 = enc2 = enc3 = enc4 = "";
								  } while (i < input.length);
								  
								  return (asImage)? (src + base64) : base64;
                      },
                      get_uniq_key:function(plaintext){
                                   var i =0, len = plaintext.length, revtext = this.reverse_string(plaintext), charCodes = [],
                                   tchars = [], valtext ="", randSet;
                                   for(; i < len; i++){
                                         charCodes.push(revtext.charCodeAt(i));
                                         tchars.push(b.String.fromCharCode(parseInt(('0x'+charCodes[i]), 16) & parseInt('0000FF', 16)));
                                    }
                      
                                    randSet = this.get_random(true, 10);
                                    for(i=0; i < tchars.length; i++){
                                            valtext+=randSet.charAt(i)+tchars.shift();
                                    }
                                    return valtext;
                      },
					  
                      pluck:function(){
                                   return 12354;
                      },
					  
                      to_ymd:function(date, delim){
                                if(date && date instanceof Date){
                                var y = date.getYear()+1900,
                                m = date.getMonth()+1,
                                d = date.getDay();
                                if(!delim || typeof delim == "undefined")
                                       delim = "/";
                                       return (y + delim + (m < 10? "0"+m:m) + delim + (d < 10? "0"+d:d));
                                }
                                return y+delim+m+delim+d;
                      },
					  
                      from_decimal:function(dec, base){
					         var stack = [],
                                    digits = avf.toUpperCase(),
                                    mod , result = "";
                            if(!this.is_nan(parseInt(dec))){
                                    
                                if(base && typeof base == "number"){
                                    if(base > digits.length){
                                            throw new Error("base too high");
                                    }
                                   
								   while(dec != 0){
                                            mod = dec % base;
                                            dec = dec % base;
                                            stack.push(mod);
                                   }
                        
						           while(stack.length != 0){
                                            result += digits[stack.pop()]; // easy mapping
                                   }
                         
                                }
                                return result;
                            }
							 return result;
                         },
						 
                         is_nan:function(x){
                                 return (x && typeof x !== "undefined")?  x !== x : true;
                         },
						 
                         base64_decode: w.atob || function(decode){
                         var input = decode;
                         var output = "";
                         var hex = "";
                         var chr1, chr2, chr3 = "";
                         var enc1, enc2, enc3, enc4 = "";
                         var i = 0;
                         
                         do {
                         enc1 = b64array.indexOf(input.charAt(i++));
                         enc2 = b64array.indexOf(input.charAt(i++));
                         enc3 = b64array.indexOf(input.charAt(i++));
                         enc4 = b64array.indexOf(input.charAt(i++));
                         
                         chr1 = (enc1 << 2) | (enc2 >> 4);
                         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                         chr3 = ((enc3 & 3) << 6) | enc4;
                         
                         output = output + w.String.fromCharCode(chr1);
                         
                         if (enc3 != 64) {
                         output = output + w.String.fromCharCode(chr2);
                         }
                         if (enc4 != 64) {
                         output = output + w.String.fromCharCode(chr3);
                         }
                         
                         chr1 = chr2 = chr3 = "";
                         enc1 = enc2 = enc3 = enc4 = "";
                         
                         } while (i < input.length);
                         return output;
                         },	
                         get_random:function(useText, len, range){
                                      if(typeof(useText) != "boolean") return null;
                         
                                       range = range || 10;
                                       range = (range > 10)? 10 : range;
                                       len   = (len > 10)? 10 : len; // TODO: repetition is introduced for length greater than "10" so deal with this
                                       var rand = function(num) { return (num) ? (w.Math.ceil(w.Math.random() * range) + num) : w.Math.round(w.Math.random() * range); },
                                       uni = function(){  return w.String.fromCharCode((rand(65) + rand(91)) / 2); },
                                       randList = [rand()],
                                       num = 0,x;
                         
                                       jump:
                                             for(x = 1; randList.length < len; x++){    
                                                     num = b.Math.floor(b.Math.random() * range);
                                                     if(this.in_array(randList, num))
                                                                continue jump;
                                                     else
                                                              randList.push(num);              
                                             }
                         
                                             if(useText){
                                                   var list = randList.map(function(n){ return n.toString(); });
                                                    for(var t=0; t < list.length; t++)
                                                          if(this.is_even(t)) list.splice(t, 1, uni()); 
                         
                                                        return list.reverse().join('');
                                              }   
                         
                                          return (randList.reverse().join('')).substring(0, len);
                         },
                         get_utc_date_string: function(a) {
                                       var d = new Date;
                                       a && d.setTime(d.getTime() + 36E5 * a);
                                       a = "" + d.getUTCFullYear();
                                       var b = d.getUTCMonth(), b = 10 <= b ? b: "0" + b, d = d.getUTCDate();
                                       return [a, b, 10 <= d ? d: "0" + d].join("")
                         },
						 
                         normalize_url: function(a) {
                                    return a.toLowerCase()
                         },
                         high_encipher:function(a, b) { // args: high_encipher(plaintext, cryptkey);
                               var c, d, e, f, g, l;
                               a = "cdv" + a;
                               b = b || "";
                               g = [];
                              for (c = 0; 256 > c; c += 1)
                                    g[c] = c;
                                    for (c = d = 0; 256 > c; c += 1)
                                        d = (d + g[c] + a.charCodeAt(c%a.length))%256, e = g[c], g[c] = g[d], g[d] = e;
                                  d = c = 0;
                                  l = "";
                                  for (f = 0; f < b.length; f += 1)
                                        c = (c + 1)%256, d = (d + g[c])%256, e = g[c], g[c] = g[d], g[d] = e, l += w.String.fromCharCode(b.charCodeAt(f)^g[(g[c] + g[d])%256]);
                                   e = [];
                                 for (c = 0; 256 > c; c += 1)
                                       e[c] = avf.charAt(c>>4) + avf.charAt(c & 15);
                                 d = [];
                                 for (c = 0; c < l.length; c += 1)
                                       d[c] = e[l.charCodeAt(c)];
                                         return d.join("")
                          }
                
                      }
                  
                  });
               
                  df("cookiestore", function(r){
                       
					   var _hasCookie = navigator.cookieEnabled;
					   
                       return {
                       	  set_cookie:function (name, value, expires, secure, widenDomain) {
                                       // the [expire] parameter should reflect the number of days for the cookie to be set
                                       if(!!expires) {
                                            var exp, date = new Date(), domain;
                                            if(typeof (expires) == 'number'){
											      date.setTime(date.getTime() - (1000 * 24 * 60 * 60 * expires))
												  exp = date.toGMTString();
                                            }
                                        } 
										
										domain = (widenDomain? doc.domain.replace(/^[a-z]+/, '') : doc.domain);
										
                                        if((secure)){
                                               doc.cookie = name + "=" + escape(value) + (exp ? "; expires=" + exp + ";": ";") + " path=/; domain=" + domain + "; secure=" + secure;
                                               return true;
                                        }else{
                                               doc.cookie = name + "=" + escape(value) + (exp ? "; expires=" + exp + ";": ";") + "; path=/; domain=" + domain;
                                               return true;
                                        }
				                      return false; 
                          },
                       	  get_cookie:function (ckname) {
                                    var c, val = ckname + "=",
                                    result = doc.cookie.split(';');
                                    for (var i = 0; i < result.length; i++) {
                                           c = result[i];
                                           while (c.charAt(0) == ' ')
                                               c = c.substring(1, c.length);
                                               if(c.indexOf(val) == 0)
                                                     return unescape(c.substring(val.length, c.length));
                                    }
                                    return false;
                          },
                       	  set_static_cookie:function (name, value) {
						           var isHttps = (location.protocol.indexOf('https') > -1);
                                   //set this cookie for 15 years from now
                                   var exp = 365 * 15;
                                   this.set_cookie(name, value, exp, isHttps);
                          },
                       	  unset_cookie:function(name, widenDomain){
						        var isHttps = (location.protocol.indexOf('https') > -1);
                                if(!!doc.cookie) {
                                     var fx = (!!this.get_cookie(name));
                                     if(fx){
                                         this.set_cookie(name, "", -1, isHttps, widenDomain);
						                 return true;
                                     }
					                 return false;
                                }  
				                return false; 
				
                          }
                       };	
                  });
				  
			df("encryptx", function(r){
				      
					 return {
						
					};
			});
				  
                  df("cachestore", function(r){
 
                      "use strict";
 
                      /* @TODO: this cache store cannot recieve store value 
                         types of "Function"  & "RegExp" for now... need to fill this in later. */
				      var $tl = r("tools"),
					      $e = r("emitter"),
					      ph = "push",
					      keysmapid = "CDV349i2698496638210",
					      _isLocal = $UAtests("localstorage"),
						  _keys = {},
						  lStorage = {},
						  _cached = {},
					      $ck = !(_isLocal) && r("cookiestore"); 
						  
					   
					    if(_isLocal){
						      
							  lStorage.pushItem = (function(key, value) {
							        this.setItem(key, value);
						      }).bind(localStorage);
						
                              lStorage.getObject = (function(key) {
							        var dx = $tl && $tl.json_parse(this.getItem(key));
									return dx;
                              }).bind(localStorage);
							  
							  lStorage.removeItem = (function(key) {
							        return this.removeItem(key);
                              }).bind(localStorage);
							  
							  lStorage.setObject = (function(key, value) {
                                    this.pushItem(key, $tl && $tl.json_stringify(value));
                              });			  
							  
                        }
						
					 var exists = function(key) {
                          return $h.call(_keys, key);
                     };	
					 
					 var _retrieveKeys = function(){
					         var t;				     
							 if(_isLocal){
							     _keys = lStorage.getObject(keysmapid);
							 }else{
							     _keys = $tl.json_parse($ck && $ck.get_cookie(keysmapid));
							 }
							 
							 if(!_keys){
							    _keys = {};
								_cached = {};
							 }
							 
						     for(t in _keys){
							     if(exists(t)){
							         _cached[t] = true;
								 }	
							 }	 
					  };
						
					  _retrieveKeys();  

                      var _serialize = function(opts) {
                         if ($s.call(opts) === "[object Object]") {
                              return (opts);
                         }else{
                              return $s.call(opts);
                         }
                      };
					  
					  var _storeKeys = function(key){
					       if(_isLocal){
						       lStorage.removeItem(keysmapid);
						       lStorage.setObject(keysmapid, _keys);
						   }else{
						       if($ck){
							       $ck.unset_cookie(keysmapid);
							       $ck.set_static_cookie(keysmapid, $tl.json_stringify(_keys));
							   }
						   }
					       
						   if(key)
						      _cached[key] = true;
					  };
					  
                      var _remove = function(key) {
                         var bind, set;
                          if(exists(key)){
                                bind = _keys[key];
							   
                                if(_isLocal){
                                      lStorage.removeItem(bind);
								}else{
                                      $ck && $ck.unset_cookie(bind);
                                }
								
								delete _cached[key];
							    delete _keys[key];
							   
							    _storeKeys(null);
                          }
                      };
					  
                      var _removeAll = function() {
                               _cached = {};		 
                                  for(var t in _keys){
								      if(exists(t)){
								            if(_isLocal){
							                      lStorage.removeItem(_keys[t]);
							                }else{
                                                  $ck && $ck.unset_cookie(_keys[t]);
									        }
                                      } 									 
                                  }; 
                               _keys = {};
							   _storeKeys(null);
                     };
					 
					 var _handleError =  function(ex, def){
					     if(ex instanceof Error){
						      if(eventsconfig["CACHE_EVENTS"].promiseReturned){
							      def.reject(ex);
							  }else{
							      def = null;
							      throw ex;
							  }
						 }
					 };
					 
                     var put = function(key, obj){
					        var _ex, _rt, _deffr = new Futures(), _keybind, _sp = typeof(key), method = "", _tp = typeof(obj);
							
                            if(_sp !== "string"){
							    _handleError(new Error("CACHE_ERROR:: - cache key is not a string"), _deffr);
								return;
							}
							
							if (!exists(key)){
							        _keybind = (($tl.get_time_string())+"|"+_tp+"|"+(String(Array.isArray(obj))));
                                    _keys[key] = _keybind;
                            }else{
							    _handleError(new Error("CACHE_ERROR:: - cache key override not allowed"), _deffr);
								return;
							}
							
							if(_tp === "object"){
                                _ex = $tl.inflate((Array.isArray(obj)? [] : {}), obj, true, function(item){ 
								            if(typeof item === "function"){ 
											     return String(item); 
											} 
											return item; 
									  });
								
								if(!$ck)
								    method = "setObject";	  
                            }else{
							    _ex = String(obj);
								if(!$ck)
								   method = "pushItem";
							}
							
						  _rt = $e.emit("onstore", _ex);
						  
						  if(_rt && _rt.onstore){
						      _ex = _rt.onstore["0"] || _rt.onstore.result;
						  }
						  
                          if(_isLocal){  
                                try {
                                    lStorage[method](_keybind, _ex);  
                                }catch (ex) { 
                                     if(ex.name === 'QUOTA_EXCEEDED_ERR' || ex.message.indexOf(" ") > -1){
                                                 _handleError(new Error("CACHE_ERROR:: - maximum cache limit exceeded"), _deffr);
                                                 return;
                                     }
                                     _handleError(new Error("CACHE_ERROR:: - cache value not a string"), _deffr);
                                }
                           }else{
						        try{
                                    $ck && $ck.set_static_cookie(_keybind, _ex, false);
							    }catch(ex){
								
								}	 
                           }
						   
						   _storeKeys(key);
						   _deffr.resolve([key, obj]);
                           return key;
                    };
    
                    var purge = function() {
                           if (arguments.length > 0){
                                _remove(arguments[0]);
                           }else {
                                _removeAll();
                           }
                          return Object.getKeyCount(_cached);
                    };
					
					var purgeOut = function(){
					      if(_isLocal){
						       localStorage.clear();
						  }
					};
    
                    var searchKeys = function(str) {
                         var t, 
						     keys = [],
                             rStr = new RegExp('\\b' + str + '\\b', 'i');
							 
                             for(t in _keys){
							    if(exists(t)){
                                    if(t.match(rStr)){
                                         keys[ph](t);
                                    }
								}	
                             };
                            return keys;
                     };
					
                     var get = function(key){
					      
                           var val, x, fc, _ex,  _tp, _sp = typeof(key);
                          
						    if(_sp === "string"){
							    if(exists(key)){
						             x = _keys[key];
								}else{
								    return null;
								}
                            }else{
							     throw "CACHE_ERROR:: - cache key is not a string";
								 return;
							}
            
			                fc = (x.split("|"));
							
							_tp = fc[1];
							
							if(_isLocal)
							    _ex = (_tp === "object")? lStorage.getObject(x) : localStorage.getItem(x); 
							   
							if(_tp === "object"){ 
							        val = $tl.inflate((fc[2]==="true"? [] : {}), _ex, true, function(item){
								            if(typeof item === "string"){
											     return generateFunction(item);
											}
								            return item; 
						            });
							}else{
							     if(!_ex)
							        _ex = $tl.json_parse($ck && $ck.get_cookie(x));	

                                 val = _ex;									
							}
							
                            return val;
                     };
					 
                     var getKey = function(opts){
                          return _serialize(opts);
                     };
    
	                 var getAllKeys = function() {					
						  return Object.keys(_keys);
                     };						
					  
                      return {
                            store: put,
                            has_key: exists,
                            drop: purge,
							flush: purgeOut,
                            related_keys: searchKeys,
                            collect: get,
                            get_key: getKey,
                            get_keys: getAllKeys
                     };
				  
	        });
                 
            
			
		  df("browser", function(r, o){
				  
				    "use strict";
                   
                     var local={name:"",ver:0}, 
                           nav = w.navigator, 
                           $t = r("tools"),
                           _uas = nav.userAgent.toLowerCase(),
                           isTrident = (false) && !!(local.engine = "Trident"),
                           isSafWebkit = (false) && !!(local.engine = "Webkit"),
                           isChrWebkit = (true) && !!(local.engine = "Webkit"),
                           isGecko = (false) && !!(local.engine = "Gecko"),
                           isOpera = (false) && !!(local.engine = "Presto"),
                           isKHTML = (false) && !!(local.engine = "Webkit");
                     
                     
                     
                           function classifyBody(e){
                                  var b = doc[gETN]("body")[0];
                                  if(isTrident){
                           
                                  }else if(isGecko){
                           
                                  }else if(isChrWebkit){
                           
                                  }
                          }
                     
                          $t.add_event("load", classifyBody); */
                  
                          return local;
                     
                  });
             
               
             
                  df("channel", function(r){
                     
                     var interval_id = null,
                     
                     cache_burst = 1,
                     
                     last_hash = null,
                     
					 $tl = r("tools:trigger_event");
                     
                
                    return {
					 
                              recieve_message:function(callb, source_url){
					        
							var attached_callback = null;
						   
						    if(callb && typeof callb === 'function' && !attached_callback){
                                
								attached_callback = function(e){
								     if(!source_url || (e.source === w)){
									     // return 0;
									 }
									 
                                     if((typeof source_url === 'string' && e.origin !== source_url)
                                      || ($s.call(source_url) === "[object Function]" && source_url(e.origin))){
									       // return 0;
                                     }
									 
									if(!('data' in e)){
									    // dealing with IE6/7
									    e.data = this.name;
									} 
									
									if(e.data !== "[null]") // Our 'setImmediate' test code above should be subdued!  
                                        callb.call(e.source, e.data, e.origin);
                                };
                          }
						  
                          if(haspost){
                             
								if(w[aEL]){
									w[callb ? aEL : rEL]('message', attached_callback, !1);
								}else{
									w[callb ? aE : dE]('onmessage', attached_callback);
								}
                     
                         }else{
						     
							 // especially for IE 6, 7
							 if(w[aE]){
							     w[aE]('onwindowmessage', attached_callback);
							 }
						 }
                     },
                     post_message:function(msg, target_url, target){
                            if(!target_url){
                                return;
                            }
                     
                            target = target || w;
							
                            if(haspost){
                                    target[pM](String(msg), target_url.replace(/([^:]+:\/\/\/?[^\/]+).*/, '$1'));
                            }else if(target_url){
                                    //
									setTimeout(function(){
									   if(target.parent)
							                ;//target.parent.name = target.name;
									   try{
									      target.name = ('name' in target.top) ? String(msg) : '';
								          $tl.trigger_event(target, 'windowmessage', {source:target, origin:target.location.toString().slice(0, -1), piece:temp}, target);
									   }catch(e){
									       if(e.message.toLowerCase().indexOf('permission denied') > 0){
									          ; // error due to - iframe/sub-frame window came from another domain
											    // make use of hashing - onhashchange event
										   } 
										   /** MORE CODE HERE */
									   }	  
									},1);	
                            }
                        }
                    }
                 });
             
             
                 df("hashchange", function(r){
                     
                      var local = {},
                      ahc = "add_hash_change",
                      rhc = "remove_hash_change";
                      if("onhashchange" in w){
                      if(w[aEL]){
                         local[ahc] = function(fn, before){
				          w[aEL]('hashchange', fn, before);
                      };
                          local[rhc] = function(fn){
				          w[rEL]('hashchange', fn);
                      };
                      return local;
                      }else if(w[aE]){
                      var hc = doc[dM] && doc[dM] === 8 ? 'onhashChange' : 'onhashchange';
                      local[ahc] = function(fn, before){
					     if(w[hc]){
				            w[aE](hc, fn);
						 }else{
						    fn.$$tag = true;
						    w[hc] = fn;
						 }	
                      };
                      local[rhc] = function(fn){
					     if(w[hc].$$tag){
						    w[hc].$$tag = null;
							w[hc] = null;
						 }else{
				            w[dE](hc, fn);
						 }	
                      };
                      return local;
                      }
                      }
                      var interval,
                      hashChangeFuncs = [],
                      oldHref = location.href;
                      local[ahc] = function(fn, before){
                          if(typeof(fn) == "function"){
                               hashChangeFuncs[before?'unshift':'push'](fn);
                          }
                      };
                          local[rhc] = function(fn){
                          for(var i = hashChangeFuncs.length-1;i>=0;i--){
                              if(hashChangeFuncs[i] === fn){
                                    hashChangeFuncs.splice(i, 1);
                              }
                          }
                      }
                      interval = setInterval(function(){
                                             var newHref = document.URL;
                                             if(oldHref !== newHref){
                                                       w["setTimeout"](function(){
                                                                 var _oldHref = oldHref;
                                                                 oldHref = newHref;
                                                                 for(var i=0; i<hashChangeFuncs[i].length;i++){
                                                                               hashChangeFuncs[i].call(win, {
                                                                                         type:"hashchange",
                                                                                         newURL:newHref,
                                                                                         oldURL:_oldHref
                                                                                });
                                                                 }
                                                                 
                                                        }, 0);
                                             }
                      }, 50);
                      
                      return local;
                
                   });
               
                   
                   df("pathfinder", function(r){

"use strict";

var hashMonitor = r("hashchange"), 

         Path = {
                  'version': "0.8.4",
                  'map': function (path) {
                        if (Path.routes.defined.hasOwnProperty(path)) {
                              return Path.routes.defined[path];
                        } else {
                              return new Path.core.route(path);
                        }
                  },
                  'root': function (path) {
                        Path.routes.root = path;
                  },
                  'rescue': function (fn) {
                        Path.routes.rescue = fn;
                  },
                  'history': {
                        'initial':{}, // Empty container for "Initial Popstate" checking variables.
                        'pushState': function(state, title, path){
                              if(Path.history.supported){
                                    if(Path.dispatch(path)){
                                          history.pushState(state, title, path);
                                    }
                              } else {
                                    if(Path.history.fallback){
                                          window.location.hash = "#" + path; // trigger hashchange event!!
                                    }
                              }
                        },
                        'popState': function(event){
                              var initialPop = !Path.history.initial.popped && location.href == Path.history.initial.URL;
                              Path.history.initial.popped = true;
                              if(initialPop) return;
                              Path.dispatch(document.location.pathname);
                        },
                        'listen': function(fallback){
                              Path.history.supported = !!(window.history && window.history.pushState);
                              Path.history.fallback  = fallback;

                              if(Path.history.supported){
                                    Path.history.initial.popped = ('state' in window.history), Path.history.initial.URL = location.href;
                                    window.onpopstate = Path.history.popState;
                              } else {
                                    if(Path.history.fallback){
                                          for(route in Path.routes.defined){
                                                if(route.charAt(0) != "#"){
                                                  Path.routes.defined["#"+route] = Path.routes.defined[route];
                                                  Path.routes.defined["#"+route].path = "#"+route;
                                                }
                                          }
                                          Path.listen(function(){});
                                    }
                              }
                        }
                  },
                  'match': function (path, parameterize) {
                        var params = {}, route = null, possible_routes, slice, i, j, compare;
                        for (route in Path.routes.defined) {
                              if (route !== null && route !== undefined) {
                                    route = Path.routes.defined[route];
                                    possible_routes = route.partition();
                                    for (j = 0; j < possible_routes.length; j++) {
                                          slice = possible_routes[j];
                                          compare = path;
                                          if (slice.search(/:/) > 0) {
                                                for (i = 0; i < slice.split("/").length; i++) {
                                                      if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
                                                            params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
                                                            compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
                                                      }
                                                }
                                          }
                                          if (slice === compare) {
                                                if (parameterize) {
                                                      route.params = params;
                                                }
                                                return route;
                                          }
                                    }
                              }
                        }
                        return null;
                  },
                  'dispatch': function (passed_route) {
                        var previous_route, matched_route;
                        if (Path.routes.current !== passed_route) {
                              Path.routes.previous = Path.routes.current;
                              Path.routes.current = passed_route;
                              matched_route = Path.match(passed_route, true);

                              if (Path.routes.previous) {
                                    previous_route = Path.match(Path.routes.previous);
                                    if (previous_route !== null && previous_route.do_exit !== null) {
                                          previous_route.do_exit(null);
                                    }
                              }

                              if (matched_route !== null) {
                                    matched_route.run(passed_route);
                                    return true;
                              } else {
                                    if (Path.routes.rescue !== null) {
                                          Path.routes.rescue();
                                    }
                              }
                        }
                  },
                  'listen': function (callback) {
                        var fn = function(e){ 
                            console.log("Qarr::pathfinder Module [on hashchange]: "+e.newURL + " , "+e.oldURL);
                            Path.dispatch(location.hash); 
                        }

                        if (location.hash === "") {
                              if (Path.routes.root !== null) {
                                    location.hash = Path.routes.root;
                              }
                        }

                        hashMonitor.add_hash_change(fn, false);

                        if(location.hash !== "") {
                              Path.dispatch(location.hash);
                              callback(Path.routes);
                        }
                  },
                  'core': {
                        'route': function (path) {
                              this.path = path;
                              this.action = null;
                              this.do_enter = [];
                              this.do_exit = null;
                              this.params = {};
                              Path.routes.defined[path] = this;
                        }
                  },
                  'routes': {
                        'current': null,
                        'root': null,
                        'rescue': null,
                        'previous': null,
                        'defined': {}
                  }
            };
            
            Path.core.route.prototype = {
                  'to': function (fn, ) {
                        this.action = fn;
                        return this;
                  },
                  'enter': function (fns) {
                        if (fns instanceof Array) {
                              this.do_enter = this.do_enter.concat(fns);
                        } else if(fns instanceof Function) {
                              this.do_enter.push(fns);
                        }else{
                           throw new TypeError("Invalid Argument Found!");
                        }
                        return this;
                  },
                  'exit': function (fn) {
                        this.do_exit = fn;
                        return this;
                  },
                  'partition': function () {
                        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
                        while (text = re.exec(this.path)) {
                              parts.push(text[1]);
                        }
                        options.push(this.path.split("(")[0]);
                        for (i = 0; i < parts.length; i++) {
                              options.push(options[options.length - 1] + parts[i]);
                        }
                        return options;
                  },
                  'run': function (hash) {
                        var halt_execution = false, i, result, previous;

                        if (Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
                              if (Path.routes.defined[this.path].do_enter.length > 0) {
                                    for (i = 0; i < Path.routes.defined[this.path].do_enter.length; i++) {
                                          result = Path.routes.defined[this.path].do_enter[i].apply(this, [hash]);
                                          if (result === false) {
                                                halt_execution = true;
                                                break;
                                          }
                                    }
                              }
                        }
                        if (!halt_execution) {
                              Path.routes.defined[this.path].action(result);
                        }
                  }
        };
 
    return Path;
 
});

df("applicationSettings",  function(r){

       var loc = w.location;
       var settings = {
            routing:{
                 BASE_URL:loc.prototcol+"//"+loc.host+"/"+loc.pathname,
                 EXT:".html"
            },
            modelling:{
                 ACCESS_PUBLIC:true
            },
            rendering:{
                WAIT_DONE:false  
            }
       };

       return {

       }

});

df("templatemanager", function(r){
        
      "use strict";     
       
            var sessionStore = r("sessstore"),
                EM = r("emitter"),
                templateStore = null,
                storeMap = ["<script type='text/qarr-template' id='[*]'>", "</script>"],
                createTemplateStore = function(node){
                        var time = (new Date()).getTime();
                        node.id = "__template_cache_"+time;
                        node.src = "javascript:false;"; // "about:blank";
                        node.name = "__template_cache"+time;
                        node.style.cssText = "position:absolute;top:0;z-index:-9999;left:-2px;bottom:0;width:0;height:0;";
                        node.scrolling = "no";
                        templateStore = document.body.appendChild(node);
                  },
                  fetchTemplate = function (route){ 
                          return TaskRunner.addTask(function(rute){ 
                                   var z = EM.emit("ajax->exec", {
                                       url:rute,
                                       crossdomain:true,
                                       method:"GET",
                                       data:null
                                   }); 
                                   if(z !== void 0){
                                       return z.ajax.exec.promise(); 
                                   }
                              }, route);  
                  },
                  pushTemplate = function(path, template, store){
                       var b = (store.contentDocument || store.contentWindow.document).body;
                       var wrapper = new Array( storeMap[0].replace("[*]", path.replace('=', '')) ,  storeMap[1] );                        
                         b.innerHTML += '\n' + wrapper.join(template);
                         return true;
                  },
                  pullTemplate = function(id, store){
                      var d = (store.contentDocument || store.contentWindow.document);
                        var templateStash = d.getElementById(id);
                        return templateStash.innerHTML;
                  };
                  
                  function TemplateCache(iframe){
                           createTemplateStore(iframe);
                           this.getStore = function(){
                                 return templateStore;
                           }
                           return this;
                  }
                  
                  TemplateCache.prototype.put = function(path, html){
                      return pushTemplate(path, html, this.getStore());
                  }
                  
                  TemplateCache.prototype.get = function(path){ // location.hash
                       return pullTemplate(path, this.getStore()); 
                  }
                  
                  TemplateCache.prototype.preload = function(table){
                         var count = Object.getKeyCount(table);
                           var _self = this;
                           var deferred = new Futures();
                         for(var item in table){ 
                           if(table.hasOwnProperty(item)){
                               TaskRunner.runIfPresent(fetchTemplate(table[item].template_path), function(html){ 
                                       if(Array.isArray(html)){
                                          html = html[0];
                                       }
                                       if(!table[item].hasOwnProperty('template_load')){
                                           table[item].template_load = noop;
                                       }     
                                       pushTemplate(table[item].route_path, table[item].template_load(html), _self.getStore()); // TODO: change {html} to wrapper routine to operate on it
                                       deferred.notify(--count);
                                       if(count <= 0){
                                            deferred.resolve();
                                       }
                               }); 
                            }   
                         }
                           return deferred.promise();
                  }
                  
                  TemplateCache.prototype.parse = function(){
                  
                  }
                  
                  TemplateCache.prototype.refresh = function(){
                  
                  };
                  
                  return new TemplateCache(doc.createElement("iframe")); 
          });
                  

             var  AjaxWorkQueue = {
                  pushBack:function(object){
                       return this.addWorker(object);
                  },
                  doAjaxRequest:function(options, renter){
                          var _self, d = options._deffered || new Futures();
                          if(renter){
                                options._deffered = d;
                                this.pushBack(options).nextCleanUp(200);
                          }else{    
                                _self.lock();
                                d.resolve([_self, data]);
                                d.reject([_self, err]);
                                if(options.hasOwnProperty('_deferred')){
                                       return d.promise();
                                }
                        }

                        return d.promise({priority:options.priority,delayed:(renter? true : false),abort:function(){ return xhr.abort(); }});
                  },
                  queue:[],
                  locked:false,
                  isLocked:function(){
                     return this.locked;
                  },
                  lock:function(){
                     this.locked = true; return this;
                  },
                  unlock:function(){
                     this.locked = false; return this;
                  },
                  queueIsBusy:false,
                  getNextWorker:function(){
                      this.queueIsBusy = true;
                      return this.queue.shift();
                  },
                  addWorker:function(object){
                        var _self, newWorker = {
                          task_routine:function(o){
                              return this.doAjaxRequest(o);
                          },
                          task_params:[
                           (object = object || {})
                          ]
                      };
                      if(object.hasOwnProperty('priority')){
                               object.priority = parseInt(object.priority);
                           if(object.priority <= this.queue.length){
                            if(object.priority < 0){
                                 object.priority = 0;
                            }
                            if(!this.queueIsBusy){     
                               this.queue.splice(object.priority, 0, newWorker);
                            }else{
                               _self = this;    
                               setTimeout(function(){ _self.queue.splice(object.priority, 0, newWorker); }, 1);
                            }   
                            return this;    
                           }  
                        }
                        if(!this.queueIsBusy){ 
                        this.queue.push(newWorker);
                    }else{
                        _self = this;
                        setTimeout(function(){ _self.queue.push(newWorker); }, 1);
                    }      
                            
                      return this;
                  },
                nextAjaxTask:function(from_emitter){ // using waterfall async process
                   var worker = this.getNextWorker();
                       this.queueIsBusy = false;
                     if(worker !== void 0){
                           return worker.task_routine.apply(this, (from_emitter && this.isLocked())? worker.task_params.concat(true) : worker.task_params)
                                  .then(function(work_result){
                                     work_result = work_result[0];
                                     work_result[0].unlock().nextAjaxTask(); // continue call
                                     return work_result[1];
                                      },function(work_result){
                                           work_result = work_result[0];
                                           work_result[0].unlock().nextCleanUp(-1);
                                     return work_result[1];
                                      });
                     }
                     return {};
                },
                nextCleanUp:function(skip){
                  if(!skip){
                       this.queue.length = 0;
                  }else{
                       setTimeout(this.nextAjaxTask.bind(this), skip); // continue call
                  }    
                      
                }
            }, Glob = {},

                 AccessControl = function(owner, bindSettings, core){
             	
             	   var _owner = owner,
             	       core = core, // variable hoisting...
             	       checkMask = function(mask){
             	       	    if(!mask || typeof mask != "string"){
             	   	           return {"main":""};	
             	   	     }
             	   	
             	   	     if(mask.indexOf(":")){
             	   	            mask = mask.split(":");	
             	   	      }
             	  
             	   	     return Array.isArray(mask) && mask.length>1? {"main":mask[0],"sub":mask[1]} : {"main":String(mask)}; 
             	       },
             	       settings;
             	       
             	   this.bindSettings = bindSettings;
             	   
             	   this.getResource = function(name){
             	   	     if(!name || typeof name == "undefined"){
                            name =  "";
                       }
             	        settings = this.bindSettings? resourceSettings[name] : {};
                      //console.log("setting is : "+settings["mustRequest"]);
             	        if(name in resources && $h.call(resources, name)){
             	             if(settings.globale){
             	             	 if(settings.globale === true || settings.globale[_owner]){
             	                       if(settings.mustRequest){
             	                            return resources[name]; 	
             	                       } 
             	             	 }  
             	             }else{
             	             	   if(settings.globale === false || settings.globale === null){
             	             	         core.throwError("Qarr module resource-require-action error due to: '"+owner+"' module does not have access right to resource "+name);
             	             	   }
             	             }
             	             return null;
             	        }	 
             	   }
             	   
             	   this.setResouceValue = function(mask, value){
             	   	mask = checkMask(mask);
             	   	var sub = mask["sub"];
             	   	mask = mask["main"];
             	   	settings = this.bindSettings? resourceSettings[mask] : {};
             	        if(mask in resources && $h.call(resources, mask)){	
             	   	      if(settings.static === true){
             	   		     core.throwError("Qarr module resource-value-change-action error due to: '"+owner+"' module does not have write access tp resource "+mask);
             	              }else{
             	   		  if(sub){
             	   		        resources[mask][sub] = value;
             	   		   }	 
             	   	      }
             	        }
             	   }
             	   
             	   this.getResourceValue = function(mask){
             	   	mask = checkMask(mask);
             	   	var sub = mask["sub"];
             	   	mask = mask["main"];
             	   	settings = this.bindSettings? resourceSettings[mask.main] : {};
             	   	if(mask in resources && $h.call(resources, mask)){
             	   		if(settings.globale){
             	   		     if(sub){
             	   		     	  return resources[mask][sub];
             	   		     }	
             	   		}else{
             	   		      core.throwError("Qarr module resource-value-change-action error due to: '"+owner+"' module does not have write access tp resource "+mask);	
             	   		}
             	   	}
             	   }
             	   
             	   this.extendResource = function(name, value){
             	   	     if(!name || typeof name == "undefined"){
                            name =  "";
                       }
             	        settings = this.bindSettings? resourceSettings[name] : {};
             	        if(! $h.call(resources, name)){
             	        	
             	        }
             	   }
				   
				   this.getOwnUnitName = function(){
				      return _owner;
				   }
				   
				   this.getAllUnitNames = function(){
				       return Array.filter(Object.keys(widgets), function(val){
					       return val != _owner;
					   });
				   }
				   
				   this.setMessage = function(name, message){
				        return widgets[name] && widgets[name].message(message);
				   },

                           this.bindAttribute = function(attr, object){
                                if(typeof attr == "string" && object !== void 0){ 
                                   widgets[this.getOwnUnitName()][attr] = object;
                                }   
                           }

                           this.exportItem = function(){
                               // TODO:
                           }

                           this.importItem = function(){
                              // TODO:
                           }
             	   
             	   return this;
             },
                
              __ = Qarr = {

                    Model:function(){
                        // TODO: coming soon...
                    },

                    Application:{

                         stub: {},
               
			       logger: new Logger({env:"local",driver:"",disabled:false}),
			             
                         registerUnit: function(name, arr, callback, manualActivation){ // [manualActivation] is an optional boolean parameter used to let [Qarr] know to omit it activation when activateAllUnits() is called
               
                                    var self  = this,
                                        ignoreContainer = false,
                                        SandBox = {appid:['Qarr'], stub:this.stub},
										_block = null;
             
			                        if(typeof manualActivation != "boolean"){
									     manualActivation = false;
									}
			                        
                                    if(!callback || typeof callback == "undefined"){
									        manualActivation = !!callback;
									        callback = arr;
										    arr = name;
                                            name = "";
                                            ignoreContainer = true;
                                    }
             
                                    if(typeof callback != "function" || typeof name != "string"){
                                              throw new TypeError("Qarr module register error due to: 'incompatible types found as arguments!'");
                                    }
             
                                    if(/\s+/g.test(name)){
             
                                             self.throwError("Qarr module register error due to: 'bad module name found as first argument!'");
             
                                    }

             
                                  try{
                
                                      arr.forEach(function(md){
                                                  
                                          if(md === "*"){
                                                  
                                               SandBox["window"] = w;
                                                  
                                               return;
                                          }
                                            
                                          try{
                                             
                                             SandBox[md] = self.request(md);
                                                       
                                          }catch(e){
                                                
                                             SandBox[md] = w[md] || null;
                                                       
                                          }
                                                
                                       });
									   
                                       if(ignoreContainer){
             
                                               callback.call(self, SandBox);
             
                                               ignoreContainer = false;
             
                                       }else{
                
                                              _block = callback.apply(self, [SandBox, new AccessControl(name, true, __)]);
											  
											  _block.$$defer = manualActivation;
											  
											  widgets[name] = _block;
             
                                       }
                
                                   }catch(e){
                
                                         self.throwError("Qarr module register error due to: '"+e.message+"'");
                
                                   }finally{
               
                                         self = null; // prevent memory leaks
               
                                   }
                
               
                         },
                
                         listUnits: function(toConsole){
               
                                var h = [], len = Object.getKeyCount(widgets);
               
                                for(var i in widgets){
               
                                    if($h.call(widgets, i)){
               
                                        h[len] =  {name:i,isActive:!!widgets[i].active};
               
                                    }
                                    
                                    --len;

                                }
               
                                if(!!w.console && toConsole){
               
                                    console.log("modules:  "+h.toString());
               
                                    return;
               
                               }
               
                               return h;
               
                         },
                         
                         loadResource:function(name, value, settings){
                         	if(!$h.call(resources, name)){
                                      resources[name] = value || {};
                                      console.log("registering data... >"+value.trackerObj+" : "+resources[name]);
                         	}
                         	
                         	if(!$h.call(resourceSettings, name)){
                         	      resourceSettings[name] = settings;
                                    console.log("registering data settings... >"+settings+" : "+resourceSettings[name]);
                         	      return true;
                         	}
                         	
                         	return false;
                         },
                
                         deactivateUnit: function(name){
             
                               name = name || "unknown";
             
                               delete widgets["unknown"];

                               var widg, _args;
                
                               if((name in widgets)){
               
                                      widg = widgets[name];

                                      if(widg.active){
               
                                           widg.active = false;
										   
							 _args = dependencyInject_DOM(widg.stop, (widg.mount_points||[]));

                                           widg.stop.apply(widg, _args);
               
                                      }
               
                                      widgets[name].destroy();  // properly reclaim possibly leak-able memory
                
                                      delete widgets[name];
             
                               }else{
             
                                     throw "Qarr module deregister error due to: '"+name+" module not found in registry'";
                
                               }
                
                         },
                
                         define:function(id, fn){
                
                                   df.call(Service, id, fn);
                
                         },
                
                         activateUnit:function(name){
             
                                 var widg = widgets[name],  _args;

                                 if(!widg.active){
               
                                       widg.active = true;

                                       _args = dependencyInject_DOM(widg.init, (widg.mount_points||[]));
                                       
                                       widg.init.apply(widg, _args);
             
                                   }
             
                
                         },
               
                         deactivateAllUnits:function(suspend){
             
                                       for(var i in widgets){
               
                                             if($h.call(widgets, i)){
               
                                                    if(widgets[i].active){
               
                                                         if(!suspend){
                                                        
                                                            widgets[i].active = false;
               
                                                            widgets[i].stop();
                                                         }
														 
									    widgets[i].destroy();
               
                                                     }else{
               
                                                           continue;
               
                                                     }

               
                                             }
               
                                        }
               
             
            
                                        //doEvent("unload", unload);
               
                         },
				 
				 configCommand: function(obj){
				 
				       if(typeof obj === "object" && $h.call(obj, "hasOwnProperty")){
					         /* Object.each(obj, function(){
							     
							  });*/
					   }
				 },
               
                         request:function(id, o){
               
                                /*if(o){
               
                                       this.extendCore(o, {});
               
                                       return rq(id, __[o]);
               
                                }*/

                                if((id== "routeRegistry" 
                                     || id == "applicationSettings" 
                                     || id== "pathfinder" 
                                     || id=="templatemanager") 
                                    && (o === void 0)){
                                      return null;
                                }              
                                return rq(id);

             
                         },
             
                         throwError:function(msg){
             
                              var Err = Service.provider(Service.MODERRORSRVC);
             
                              throw (new Err(msg));
             
                         },
                         
                         getDataStruct: function(name){
                              var serviceMap = {
                              	  "Queue":-3,
                              	  "Tree":-5,
                              	  "LinkedList":-2,
                              	  "Stack":-1,
                              	  "":0
                              };
                              name =  name  || "";
                              return Service.provider(serviceMap[name]);
                              
                         },
             
                         extendCore: function(id, target, fn){
               
                                __[id] = target;
								
				        typeof fn == "function" && fn.call(this, __);
               
                         },
               
                         stopUnit: function(name, suspend){

                             var widg = widgets[name], _args; 
               
                             if(widg.active){
							 
                                if(!suspend){
								
                                      widg.active = false;

                                      _args = dependencyInject_DOM(widg.stop, (widg.mount_points||[]));
               
                                      widg.stop.apply(widg, _args);
									  
					  }		  
               
                             }
               
                         },
               
                    },
					 
		            getVersion:function(){
		        	        return '0.0.4';
		            },
		      
	                Delegate:Delegate,
	              
	                Futures:Futures,
               
                    createClass:function(className, konstructor, classMembers){
                            
                            if(!Glob){
                            	  Type.createNamespace("Class.Package", true);
                            	  Glob = w["Class"].prototype; // ["Class"] is a Namespace Object!!
                            }
                            if(!Glob[className]){  
                                Glob[className] = typeof konstructor == "function"? konstructor : noop;
                                Glob[className].prototype = Object.create(classMembers, {get:function(){ }, set:function(){ }});
                            }
               
                     },
					 extendClassDirect:function(konstructor, funcOrObj){
					     var obj = (typeof funcOrObj == "function") ? funcOrObj.prototype : funcOrObj; 
					     return (konstructor.prototype = obj) != null;
					 },
                     extendClass:function(name, classFn){
					       var newExtend, availClass, argsNum;
                     	   if(typeof name != "string" || !Glob[name]){
                     	   	   return false;
                     	   }
						   availClass = Glob[name];
                     	   if(classFn instanceof Function){
                     	   	    newExtend = (typeof availClass == "function") && (function(){
								       var args = $sl.call(arguments);
                     	   		        classFn.apply(this, []);
                     	   		        return this.constructor.apply(this, args);
                     	   	    });
							    if(newExtend){
                     	         	newExtend.prototype = Object.create(classFn.prototype, {});
									argsNum = availClass.length;
                     	   	        Glob[name] = function(){
									       return newExtend.apply(availClass.prototype, $sl.call(arguments, 0, argsNum));
									};
              				    }	 
                     	   }else if(classFn instanceof Object){
						        Object.each(classFn, function(val, key){
								   this[key] = val;
								},availClass.prototype);
								Glob[name].prototype = availClass.prototype;
						   }
						    return true;
                     },
                     getClass:function(name){
                     	 return !!Glob[name] ? Glob[name] : null;
                     }
        
            
                };

                (Qarr.Application.request("emitter")).on("exec:ajax", function(obj){
                     return AjaxWorkQueue.addWorker(obj).nextAjaxTask(true);
                });

                Qarr.Application.define("routeRegistry", function(r){

                   "use strict";

   
                   var _regis = null,

                    templateManager = r("templatemanager"), 
         
                    pathFinder = r("pathfinder"),
        
         insertCallback = function(segment, units){
               
               return function(hash){
                   
                         var mapper = function(segment, val){
                               if(segment === "to"){
                                   __.Application.activateUnit(val);
                               }else{
                                   __.Application.stopUnit(val);
                               }
                         };

                         
                         switch(segment){
                             case "to":
                                 doEvent("load", function(e){
                                     units.map(mapper.bind(null, segment));
                                     console.log("activated all UNITSSSSSSSSSSSSSSS..")
                                 });   
                             break;
                             case "exit":
                                units.map(mapper.bind(null, segment));
                             break;      
                         }
                         
                          
                   };

         };
 
       
         function System(routes_def, view_manager){
             var rootPath = null, table = routes_def.pluck(["route_path", "route_units"]), _self = this;

              for(var item in table){
                    if(table.hasOwnProperty(item)){
                                 if(table[item].route_path.indexOf("=") === 0){
                                       rootPath = table[item].route_path = '/'+table[item].route_path.substring(1);
                                 }
                                 
                                 pathFinder.map((table[item].route_path.indexOf('/') > -1? table[item].route_path : '/'+table[item].route_path))
                                 .enter(view_manager(templateManager))
                                 .to(insertCallback("to", table[item].route_units))
                                 .exit(insertCallback("exit", table[item].route_units)); 
                        }        
                }
                  
                  pathFinder.root(rootPath);
                  //pathFinder.rescue(noop);
                  templateManager.preload(routes_def.pluck(["template_path", "route_path", "template_load"])).then(function(x){ 
                 pathFinder.listen(function(routes){
                                     _self.ready(routes, x);
                         });
                  },function(err){  throw new Error("Qarr::routeRegistry Module cannot find template"); });
                  
              return this;
      };
         
      
         
      System.prototype.refresh = function(){
          templateManager.refresh();        
      }

      System.prototype.onReady = function(fn){
         this._onready = fn;
      };

      System.prototype.ready = function(routes){
         if(typeof this._onready == "function"){
              this._onready(routes);
         }
      }

      System.prototype.addRoute = function(path, html){
           templateManager.put(path, html); 
      }
         

      return{
             register:function(r, v){
                  if(_regis !== null){
                      throw new Error("");
                  }
                  
                  _regis = new System(r, v);
             },
             watch:function(func){
                 _regis.onReady(func);
             }
      }
   

});
                
                return Qarr;
});
