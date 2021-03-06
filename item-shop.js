// Set the date we're counting down to
var today = new Date();
var countDownDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1, 0, 0, 0).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time in utc

    var now_local = new Date();
    var now = new Date(now_local.getUTCFullYear(), now_local.getUTCMonth(), now_local.getUTCDate(), now_local.getUTCHours(), now_local.getUTCMinutes(), now_local.getUTCSeconds());

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML = hours + "h " +
        minutes + "m " + seconds + "s until next reset";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Refresh the page to reset the shop!";
    }
}, 1000);

function createItems() {
    console.log("clic")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fortnite-api.com/v2/shop/br", true);
    //xhttp.setRequestHeader("Authorization", "");
    xhttp.send();

    var jsondata;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsondata = JSON.parse(xhttp.responseText);
            console.log(jsondata);

            var shop_items_div = document.getElementById("item-shop-content");

            //daily
            var daily_title = document.createElement("h1");
            daily_title.style.marginTop = "0px";
            daily_title.style.fontSize = "30px";
            daily_title.innerHTML = "Daily";
            shop_items_div.appendChild(daily_title);

            var space_daily = document.createElement("div");
            space_daily.style.display = "flex";
            space_daily.style.flexWrap = "wrap";

            for (var i = 0; i < jsondata.data.daily.entries.length; i++) {
                var price = jsondata.data.daily.entries[i].finalPrice;
                var item = jsondata.data.daily.entries[i].items[0];

                var i_container = document.createElement("div");
                i_container.classList.add("shop-row-item");
                i_container.classList.add("splash-card");

                var item_rarity_converted = item_rarity_convert(item.rarity.value);

                i_container.setAttribute("data-rarity", item_rarity_converted);
                i_container.innerHTML = item.name + "<br>" + price;
                var i_image = document.createElement("img");
                i_image.src = item.images.smallIcon;
                i_image.setAttribute("title", item.name + " for " + price + " VBucks");
                i_container.appendChild(i_image);

                var name = item.name;
                var url = window.location.href;
                url = url.split("?")[0];

                var url_split = url.split("/");
                var url_new = url_split.slice(0, url_split.length - 1).join("/");
                url = url_new + "/item.html?search=" + name;

                i_container.setAttribute("href", url)
                i_container.addEventListener("mouseover", function() {
                    this.style.cursor = "pointer";
                });
                i_container.onclick = function() {
                    window.location.href = this.getAttribute("href");
                };
                console.log('abounda la kaka')

                space_daily.appendChild(i_container);
            }

            shop_items_div.appendChild(space_daily);
            // add <hr>
            var hr = document.createElement("hr");
            shop_items_div.appendChild(hr);

            //featured
            var featured_title = document.createElement("h1");
            featured_title.style.marginTop = "0px";
            featured_title.style.fontSize = "30px";
            featured_title.innerHTML = "Featured";
            shop_items_div.appendChild(featured_title);

            var space_featured = document.createElement("div");
            space_featured.style.display = "flex";
            space_featured.style.flexWrap = "wrap";

            for (var i = 0; i < jsondata.data.featured.entries.length; i++) {
                var price = jsondata.data.featured.entries[i].finalPrice;
                var item = jsondata.data.featured.entries[i].items[0];

                var i_container = document.createElement("div");
                i_container.classList.add("shop-row-item");
                i_container.classList.add("splash-card");

                var item_rarity_converted = item_rarity_convert(item.rarity.value);

                i_container.setAttribute("data-rarity", item_rarity_converted);
                i_container.innerHTML = item.name + "<br>" + price;
                var i_image = document.createElement("img");
                i_image.src = item.images.smallIcon;
                i_image.setAttribute("title", item.name + " for " + price + " VBucks");
                i_container.appendChild(i_image);

                var name = item.name;
                var url = window.location.href;
                url = url.split("?")[0];

                var url_split = url.split("/");
                var url_new = url_split.slice(0, url_split.length - 1).join("/");
                url = url_new + "/item.html?search=" + name;

                i_container.setAttribute("href", url)
                i_container.addEventListener("mouseover", function() {
                    this.style.cursor = "pointer";
                });
                i_container.onclick = function() {
                    window.location.href = this.getAttribute("href");
                };
                console.log('abounda la kaka')

                space_featured.appendChild(i_container);
            }

            shop_items_div.appendChild(space_featured);

            var hr = document.createElement("hr");
            shop_items_div.appendChild(hr);

            //other sections

            var other_title = document.createElement("h1");
            other_title.style.marginTop = "0px";
            other_title.style.fontSize = "30px";
            other_title.innerHTML = "Other";
            shop_items_div.appendChild(other_title);

            var space_other = document.createElement("div");
            space_other.style.display = "flex";
            space_other.style.flexWrap = "wrap";

            for (var i = 0; i < jsondata.data.specialFeatured.entries.length; i++) {
                var item = jsondata.data.specialFeatured.entries[i];
                var section = item.section;
                var price = item.finalPrice;

                var name = "";
                if (item.bundle != null) {
                    name = item.bundle.name;
                } else {
                    name = item.items[0].name;
                }

                var section = item.section.name;
                var image = item.items[0].images.smallIcon;

                var i_container = document.createElement("div");
                i_container.classList.add("shop-row-item");
                i_container.classList.add("splash-card");

                var item_rarity_converted = item_rarity_convert(item.items[0].rarity.value);

                i_container.setAttribute("data-rarity", item_rarity_converted);
                i_container.innerHTML = item.items[0].name + "<br>" + price;
                var i_image = document.createElement("img");
                i_image.src = item.items[0].images.smallIcon;
                i_image.setAttribute("title", item.name + " for " + price + " VBucks");
                i_container.appendChild(i_image);

                var name = item.items[0].name;
                var url = window.location.href;
                url = url.split("?")[0];

                var url_split = url.split("/");
                var url_new = url_split.slice(0, url_split.length - 1).join("/");
                url = url_new + "/item.html?search=" + name;

                i_container.setAttribute("href", url)
                i_container.addEventListener("mouseover", function() {
                    this.style.cursor = "pointer";
                });
                i_container.onclick = function() {
                    window.location.href = this.getAttribute("href");
                };
                console.log('abounda la kaka')

                space_other.appendChild(i_container);
            }

            shop_items_div.append(space_other);
        }
    }
}