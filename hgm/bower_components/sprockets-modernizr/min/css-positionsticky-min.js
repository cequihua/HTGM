Modernizr.addTest("csspositionsticky",function(){var e="position:",i="sticky",n=document.createElement("modernizr"),t=n.style;return t.cssText=e+Modernizr._prefixes.join(i+";"+e).slice(0,-e.length),-1!==t.position.indexOf(i)});
