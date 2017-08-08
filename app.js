/* global $ */

$(document).ready(function () {
    // array of twitch channels
    var channels = ["jimquisition", "laurakbuzz", "freecodecamp","ESL_SC2"];
    // unordered-list element to display channels
    var channelsList = $('<ul>').attr("class", "list-group");
    
    // for each channel
    channels.forEach(function(channel) {
        var channelListItem = $('<li>').attr("class", "list-group-item");
        var channelInfo = $('<span>').attr("id", "channelInfo");
        var channelLogo = $('<img>').attr("id", "channelLogo");
        // use twitch api to get info
        $.ajax({
            url: "https://wind-bow.gomix.me/twitch-api/channels/" + channel,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "jsonp",
            success: function(response) {
                if (response.error === "Not Found") {
                    channelInfo.text("Not Found");
                    channelListItem.append(channelInfo);
                    channelsList.append(channelListItem);
                }
                else {
                    // on success display channel info
                    channelLogo.attr("src", response.logo);
                    channelInfo.text(response.display_name);
                    channelListItem.append(channelLogo);
                    channelListItem.append(channelInfo);
                    channelsList.append(channelListItem);
                }
                $.ajax({
                    url: "https://wind-bow.gomix.me/twitch-api/streams/" + channel,
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "jsonp",
                    success: function(response) {
                        console.log(response);
                        var game = $('<span>').attr("id", "game");
                        var link = $('<a>').attr("id", "link");
                        var status = $('<p>').attr("id", "status");
                        if (response.stream === null) {
                            status.text("Offline");
                            channelListItem.append(status)
                        }
                        else {
                            link.attr("href", response.stream.channel.url);
                            link.text("Click to watch: " + response.stream.game);
                            game.append(link);
                            status.text(response.stream.channel.status);
                            game.append(status);
                            channelListItem.append(game)
                        }
                    }
                });
            }
        });
    });
    
    $('#channels').append(channelsList);
})

function getChannelInfo(channel) {

}

function getChannelStatus(channel) {
    
}