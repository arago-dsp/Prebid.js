/* eslint-disable quotes */

// requirements for a native rendering function:
//
// - it must define a window.renderAd function that will be called by the Prebid Universal Creative
// - renderAd() must return a fully resolved and ready-to-display block of HTML that will be appended to the body

window.renderAd = function(data) {
  var css = `.sponsored-post {
      background-color: #fffdeb;
      font-family: sans-serif;
      width: 300px;
      height: 250px;
  }

  .content {
      overflow: hidden;
      padding: 5px;
      height: 140px;
      background-color: pink;
  }

  .thumbnail {
      width: 300px;
      height: 75%;
      background-image: url(##hb_native_image##);
      background-size: cover;
      background-position: center;
  }

  .logo {
    float: left;
    width: 40px;
    margin: 5px;
    margin-right: 15px;
  }

  h1 {
      font-size: 18px;
      margin: 0;
  }

  p {
      font-size: 12px;
      color: #444;
  }

  .attribution {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 9px;
      font-weight: bold;
      display: inline-block;
      letter-spacing: 2px;
      background-color: #ffd724;
      border-radius: 2px;
      padding: 4px;
  }`

  // eslint-disable-next-line no-multi-str
  var template = "<style type=\"text/css\">" + css + "</style>\
    <div id=\"adagio-native\" class=\"sponsored-post\">\
    <div class=\"thumbnail\"><\/div>\
    <div class=\"content\">\
        <img src=\"##hb_native_icon##\" class=\"logo\" />\
        <h1>\
          <a href=\"##hb_native_linkurl##\" target=\"_blank\" class=\"pb-click\">##hb_native_title##<\/a>\
        <\/h1>\
        <p>##hb_native_body##<\/p>\
        <div class=\"attribution\"> ##hb_native_brand## <\/div>\
    <\/div>\
    <\/div>";

  var map = {
    title: 'hb_native_title',
    body: 'hb_native_body',
    body2: 'hb_native_body2',
    privacyLink: 'hb_native_privacy',
    sponsoredBy: 'hb_native_brand',
    image: 'hb_native_image',
    icon: 'hb_native_icon',
    clickUrl: 'hb_native_linkurl',
    displayUrl: 'hb_native_displayurl',
    cta: 'hb_native_cta',
    rating: 'hb_native_rating',
    address: 'hb_native_address',
    downloads: 'hb_native_downloads',
    likes: 'hb_native_likes',
    phone: 'hb_native_phone',
    price: 'hb_native_price',
    salePrice: 'hb_native_saleprice'
  }

  for (var i = 0; i < data.length; i++) {
    if (map[data[i].key]) {
      template = template.replace('##' + map[data[i].key] + '##', data[i].value);
    }
  }

  return template;
}
