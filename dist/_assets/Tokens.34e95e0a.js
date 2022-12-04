import{c as t}from"./config.37008b9b.js";import{c as e,b as s,j as l,F as i,h as o,k as a,o as n,t as r}from"./index.b6f50067.js";var d={name:"Tokens",data:()=>({tokens:[],loading:!0}),props:{chainId:{type:Number,default:1},API_KEY:{type:String}},methods:{getTokens(){fetch(`https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/tokens/?key=${this.API_KEY}`,t).then((t=>t.json())).then((t=>{t.data.items.forEach((t=>{const e={name:t.contract_name,symbol:t.contract_ticker_symbol,swaps:t.swap_count_24h,liquidity:t.total_liquidity,liquidityQuote:t.total_liquidity_quote,quote_rate:t.quote_rate,volume:t.total_volume_24h_quote,address:t.contract_address,logo:t.logo_url};this.tokens.push(e)})),this.tokens.sort(((t,e)=>t.volume>e.volume?-1:t.volume<e.volume?1:0)),this.loading=!1}))},format(t){if(null==t)return t;const e=t?.toString();return parseFloat(e).toFixed(2)?.toString().substring(0,9).replace(/\d(?=(\d{3})+\.)/g,"$&,").replace(".00","")}},mounted(){this.getTokens()}};const c={class:"w-11/12 m-auto"},u=s("p",{class:"w-11/12 text-3xl text-main font-semibold text-green-600 py-4"}," Tokens ",-1),m={class:"flex justify-between flex-wrap"},f={class:"w-full bg-white border-2 rounded-2xl p-6 mt-6"},p=s("p",{class:"font-light text-gray-600"}," Most Traded Tokens in the last 24h ",-1),h={key:0,class:"w-full h-full grid place-items-center",style:{height:"100%"}},v=[s("div",{class:"spinner"},null,-1)],g=a('<div class="flex my-4 text-lg font-semibold justify-between"><div class="flex items-center"><p class="mr-4">#</p><div><p class="mr-4 flex">Token</p></div></div><div class="flex items-center justify-end w-4/6 text-right"><p class="w-4/12">Volume (24h)</p><p class="w-4/12">Total Liquidity</p><p class="w-4/12">Price in USD</p></div></div>',1),y={class:"flex mb-2 justify-between border-gray-400 border-solid pt-1",style:{"border-top-width":"1px"}},x={class:"flex items-center font-semibold"},b={class:"mr-4"},w={class:"flex items-center justify-end w-4/6 text-right"},_={class:"w-4/12"},k={class:"w-4/12"},q={class:"w-4/12"};d.render=function(t,a,d,j,T,$){return n(),e("div",c,[u,s("div",m,[s("div",f,[p,T.loading?(n(),e("div",h,v)):l("",!0),s("div",null,[g,(n(!0),e(i,null,o(T.tokens,((t,l)=>(n(),e("ul",{key:l,class:"text-bg-light"},[s("div",y,[s("div",x,[s("div",b,r(l+1),1),s("div",null,r(t.name),1)]),s("div",w,[s("li",_,"$"+r($.format(t.volume)),1),s("li",k,"$"+r($.format(t.liquidityQuote)),1),s("li",q,"$"+r($.format(t.quote_rate)),1)])])])))),128))])])])])};export{d as default};