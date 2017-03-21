<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="1504.81">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; line-height: 14.0px; font: 12.0px Courier; color: #007400; -webkit-text-stroke: #007400}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; line-height: 14.0px; font: 12.0px Courier; color: #000000; -webkit-text-stroke: #000000; min-height: 14.0px}
    p.p3 {margin: 0.0px 0.0px 0.0px 0.0px; line-height: 14.0px; font: 12.0px Courier; color: #aa0d91; -webkit-text-stroke: #aa0d91}
    p.p4 {margin: 0.0px 0.0px 0.0px 0.0px; line-height: 14.0px; font: 12.0px Courier; color: #000000; -webkit-text-stroke: #000000}
    p.p5 {margin: 0.0px 0.0px 0.0px 0.0px; line-height: 14.0px; font: 12.0px Courier; color: #c41a16; -webkit-text-stroke: #c41a16}
    span.s1 {font-kerning: none}
    span.s2 {font-kerning: none; color: #000000; -webkit-text-stroke: 0px #000000}
    span.s3 {font-kerning: none; color: #aa0d91; -webkit-text-stroke: 0px #aa0d91}
    span.s4 {font-kerning: none; color: #c41a16; -webkit-text-stroke: 0px #c41a16}
    span.s5 {font-kerning: none; color: #1c00cf; -webkit-text-stroke: 0px #1c00cf}
    span.s6 {font-kerning: none; color: #007400; -webkit-text-stroke: 0px #007400}
    span.s7 {font: 12.0px Monaco; font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">// Written by Daniel Cohen Gindi</span></p>
<p class="p1"><span class="s1">// danielgindi@gmail.com</span></p>
<p class="p1"><span class="s1">// http://github.com/danielgindi/app-redirect</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p3"><span class="s2">(</span><span class="s1">function</span><span class="s2">() {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span></span><span class="s3">var</span><span class="s1"> queryString = {},</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>browserMovedToBackground = </span><span class="s3">false</span><span class="s1">;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">// Parse the query string so we can take individual query string params</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>(</span><span class="s3">function</span><span class="s1">(search) {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>search = (search || </span><span class="s4">''</span><span class="s1">).split(</span><span class="s4">/[\&amp;\?]/g</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">for</span><span class="s1"> (</span><span class="s3">var</span><span class="s1"> i = </span><span class="s5">0</span><span class="s1">, count = search.length; i &lt; count; i++) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">if</span><span class="s1"> (!search[i]) </span><span class="s3">continue</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">var</span><span class="s1"> pair = search[i].split(</span><span class="s4">'='</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>queryString[pair[</span><span class="s5">0</span><span class="s1">]] = queryString[pair[</span><span class="s5">0</span><span class="s1">]] !== undefined ? ([pair[</span><span class="s5">1</span><span class="s1">] || </span><span class="s4">''</span><span class="s1">].concat(queryString[pair[</span><span class="s5">0</span><span class="s1">]])) : (pair[</span><span class="s5">1</span><span class="s1">] || </span><span class="s4">''</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>})(window.location.search);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">// Listen to visibility change to prevent next url</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>window.document.addEventListener(</span><span class="s4">"visibilitychange"</span><span class="s1">, </span><span class="s3">function</span><span class="s1">(e) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>browserMovedToBackground = window.document.visibilityState === </span><span class="s4">'hidden'</span><span class="s1"> || window.document.visibilityState === </span><span class="s4">'unloaded'</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>window.addEventListener(</span><span class="s4">"blur"</span><span class="s1">, </span><span class="s3">function</span><span class="s1">(e) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>browserMovedToBackground = </span><span class="s3">true</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span></span><span class="s3">var</span><span class="s1"> AppRedirect = {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s6">/**<span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">         </span>* @expose<span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">         </span>* @public</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">         </span>* */</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>queryString: queryString,</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>redirect: </span><span class="s3">function</span><span class="s1">(options) {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">var</span><span class="s1"> hasIos = !! (options.iosApp || options.iosAppStore);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">var</span><span class="s1"> hasAndroid = !! (options.android);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s6">/**</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>* What happens now is:</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>* 1. We select the correct platform based on userAgent</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>* 2. We try to open the app using the special schema</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space">    </span></span><span class="s7">└───</span><span class="s1">&gt; If it succeded, the we have left the browser, and went to the app.</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space">          </span>*. If the user goes back to the browser at this stage, he will be sadly redirected to the second url (AppStore etc.)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space">    </span></span><span class="s7">└───</span><span class="s1">&gt; If opening the app failed (schema not recognized), then:</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space">          </span>1. An error will be shown</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space">          </span>2. The user will be redirected to the second url.</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space">          </span>*.<span class="Apple-converted-space">  </span>Returning to the browser later will show the error.</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*<span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>* For Android it's different. There's the intent:// url, which takes the "package" argument in order to fallback to the Store.<span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>* But if you want to aggregate arguments to the store, you can use the "fallback" argument for that, and supply a Store url.<span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>* QueryString arguments will be automatically aggregated.</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">             </span>*/</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">var</span><span class="s1"> tryToOpenInMultiplePhases = </span><span class="s3">function</span><span class="s1">(urls) {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>browserMovedToBackground = </span><span class="s3">false</span><span class="s1">;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> currentIndex = </span><span class="s5">0</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> redirectTime = </span><span class="s3">new</span><span class="s1"> Date();</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>window.location = urls[currentIndex++];</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> next = </span><span class="s3">function</span><span class="s1">() {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                    </span></span><span class="s3">if</span><span class="s1"> (urls.length &gt; currentIndex) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                        </span>setTimeout(</span><span class="s3">function</span><span class="s1">() {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                            </span></span><span class="s3">if</span><span class="s1"> (browserMovedToBackground) {</span></p>
<p class="p5"><span class="s2"><span class="Apple-converted-space">                                </span>console.log(</span><span class="s1">'Browser moved to the background, we assume that we are done here'</span><span class="s2">)</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                                </span></span><span class="s3">return</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                            </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                            </span></span><span class="s3">if</span><span class="s1"> (</span><span class="s3">new</span><span class="s1"> Date() - redirectTime &gt; </span><span class="s5">3000</span><span class="s1">) {</span></p>
<p class="p5"><span class="s2"><span class="Apple-converted-space">                                </span>console.log(</span><span class="s1">'Enough time has passed, the app is probably open'</span><span class="s2">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                            </span>} </span><span class="s3">else</span><span class="s1"> {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                                </span>redirectTime = </span><span class="s3">new</span><span class="s1"> Date();</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                                </span>window.location = urls[currentIndex++];</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                                </span>next();</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                            </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                        </span>}, </span><span class="s5">10</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                    </span>}</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>next();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">            </span></span><span class="s1">// var chromeVersion = /Chrome\/([0-9\.]+)/.test(navigator.userAgent) ? navigator.userAgent.match(/Chrome\/([0-9\.]+)/)[1] : '';</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">if</span><span class="s1"> (hasIos &amp;&amp; </span><span class="s4">/iP(hone|ad|od)/</span><span class="s1">.test(navigator.userAgent)) {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> urls = [];</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">if</span><span class="s1"> (options.iosApp) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                    </span>urls.push(options.iosApp);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>}</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">if</span><span class="s1"> (options.iosAppStore) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                    </span>urls.push(options.iosAppStore);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>}</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>tryToOpenInMultiplePhases(urls);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>} </span><span class="s3">else</span><span class="s1"> </span><span class="s3">if</span><span class="s1"> (hasAndroid &amp;&amp; </span><span class="s4">/Android/</span><span class="s1">.test(navigator.userAgent)) {</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> intent = options.android;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> intentUrl = </span><span class="s4">'intent://'</span><span class="s1"> + intent.host + </span><span class="s4">'#Intent;'</span><span class="s1"> + </span><span class="s4">'scheme='</span><span class="s1"> + encodeURIComponent(intent.scheme) + </span><span class="s4">';'</span><span class="s1"> + </span><span class="s4">'package='</span><span class="s1"> + encodeURIComponent(intent.package) + </span><span class="s4">';'</span><span class="s1"> + (intent.action ? </span><span class="s4">'action='</span><span class="s1"> + encodeURIComponent(intent.action) + </span><span class="s4">';'</span><span class="s1"> : </span><span class="s4">''</span><span class="s1">) + (intent.category ? </span><span class="s4">'category='</span><span class="s1"> + encodeURIComponent(intent.category) + </span><span class="s4">';'</span><span class="s1"> : </span><span class="s4">''</span><span class="s1">) + (intent.component ? </span><span class="s4">'component='</span><span class="s1"> + encodeURIComponent(intent.component) + </span><span class="s4">';'</span><span class="s1"> : </span><span class="s4">''</span><span class="s1">) + (intent.fallback ? </span><span class="s4">'S.browser_fallback_url='</span><span class="s1"> + encodeURIComponent(intent.fallback) + </span><span class="s4">';'</span><span class="s1"> : </span><span class="s4">''</span><span class="s1">) + </span><span class="s4">'end'</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">var</span><span class="s1"> anchor = document.createElement(</span><span class="s4">'a'</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>document.body.appendChild(anchor);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>anchor.href = intentUrl;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span></span><span class="s3">if</span><span class="s1"> (anchor.click) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                    </span>anchor.click();</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>} </span><span class="s3">else</span><span class="s1"> {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                    </span>window.location = intentUrl;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">                </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>} </span><span class="s3">else</span><span class="s1"> {</span></p>
<p class="p5"><span class="s2"><span class="Apple-converted-space">                </span>console.log(</span><span class="s1">'Unknown platform, nothing to do'</span><span class="s2">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">/** @expose */</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>window.AppRedirect = AppRedirect;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p4"><span class="s1">})();</span></p>
</body>
</html>
