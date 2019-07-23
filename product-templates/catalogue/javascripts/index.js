console.log('index.js is here')

function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
    }
}


const detailsPageHeaderBannerImage = document.getElementById(`details-page-header-banner_image`);
const detailsPageHeaderBannerName = document.getElementById(`details-page-header-banner_name`);
const detailsPageHeaderBannerDescription = document.getElementById(`details-page-header-banner_description`);


console.log(`detailsPageHeaderBannerImage.src: `, detailsPageHeaderBannerImage.src);
getImageLightness(detailsPageHeaderBannerImage.src, function(brightness){
    console.log(brightness);
    if (brightness < 140) {
    	detailsPageHeaderBannerName.style.color = 'white';
    	detailsPageHeaderBannerName.style.textShadow = '0px 1px 2px #000000bf';
    	detailsPageHeaderBannerDescription.style.color = 'white';
    	detailsPageHeaderBannerDescription.style.textShadow = '0px 1px 2px #000000bf';

    	console.log(`detailsPageHeaderBannerDescription: `, detailsPageHeaderBannerDescription);
    	
    }
});