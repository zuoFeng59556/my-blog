import{_ as s,o as n,c as a,a as l}from"./app.cf7f0c08.js";const d=JSON.parse('{"title":"闭包","description":"","frontmatter":{},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"relativePath":"pages/JavaScript/closure/index.md"}'),p={name:"pages/JavaScript/closure/index.md"},o=l(`<h1 id="闭包" tabindex="-1">闭包 <a class="header-anchor" href="#闭包" aria-hidden="true">#</a></h1><h2 id="概念" tabindex="-1">概念 <a class="header-anchor" href="#概念" aria-hidden="true">#</a></h2><p><code>闭包</code>是指一个函数对周围状态的引用捆绑在一起，简单说就是内层函数引用外层函数的变量。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// 下面这段代码就形成了一个闭包。</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">123</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">ok</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;">) </span><span style="color:#676E95;">// 这里使用了外层函数 fn的变量a</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">ok</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fn </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">fn</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><p>上面代码实现了一个计数功能，变量<code>i</code>成为私有变量，外部可以使用但不能修改，因为js的垃圾回收机制，<code>i</code>一直不会被回收。<br> 闭包就是作用域链自然产生的结果，了解作用域链和垃圾回收机制，闭包就理解了。</p>`,7),e=[o];function c(t,r,y,i,F,A){return n(),a("div",null,e)}const C=s(p,[["render",c]]);export{d as __pageData,C as default};
