!function(n){n.fn.fitText=function(t,i){var e=t||1,o=n.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},i);return this.each(function(){var t=n(this),i=function(){t.css("font-size",Math.max(Math.min(t.width()/(10*e),parseFloat(o.maxFontSize)),parseFloat(o.minFontSize)))};i(),n(window).on("resize",i)})}}(jQuery);
