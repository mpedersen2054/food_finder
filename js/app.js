(function($, window) {

    var ff = ff || {

        init: function() {
            this.searchForm = $('#search');
            this.searchBtn = $('#search').find('.btn');
            this.foodInp = $('#food');
            this.cityInp = $('#city');
            this.stateInp = $('#state');
            this.results = $('#results');
            this.places = $('#places')
            this.resultsParent = this.results.parent()
            this.title = $('h2.title');
            this.address = $('.address');
            this.phone = $('.phone');
            this.rating = $('.average-rating');
            this.url = $('.business-url');
            this.categories = $('.categories').find('.badge')
            this.stateInp.html(usStateData);
            this.binding();
        },

        binding: function() {
            this.searchForm.on('submit', $.proxy(this.formSubmit, this));
        },

        formSubmit: function(e) {
            var food = this.foodInp.val(),
                city = this.cityInp.val(),
                state = this.stateInp.val(),
                info = [food, city, state];

            if ( food && city && state ) {
                this.getPlaces(info);
            } else {
                // throw form error, validation
                alert('not working')
            }
            e.preventDefault();
        },

        getPlaces: function(locData) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: getQueryString(),
                success: $.proxy(this.showPlaces, this),
                error: function(xhr, status, errorThrown) {
                    alert('error : ' + errorThrown)
                    console.log(xhr)
                }
            })

            function getQueryString() {
                var params = locData,
                    food = params[0],
                    city = params[1].replace(/ /g,"%20"),
                    state = params[2],
                    qString = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search(50)%20where%20query%3D%22'+food+'%22%20and%20location%3D%22'+city+'%2C%20'+state+'%22&format=json&diagnostics=true&callback='

                return qString;
            }
        },

        placesData: function(data) {
            var resArr = data.query.results.Result,
                arrLen;

            if (!resArr) { false; }
            return resArr;
        },

        showPlaces: function(data) {
            var p = this.placesData(data),
                arrLen = p.length,
                resultsHtml = '';

            for (var i=0; i<arrLen; i++) {
                var title = p[i].Title,
                    address = p[i].Address,
                    rating = (p[i].Rating.LastReviewDate == null) ? 'No Rating' : p[i].Rating.AverageRating,
                    phone = p[i].Phone,
                    url = (p[i].BusinessUrl == null) ? 'No Website' : p[i].BusinessUrl;

                var eachResult = appendResult(title,address,rating,phone,url)
                resultsHtml+=eachResult
            }
            this.places.html('<div class="row">'+resultsHtml+'</div>');
        }

    }

    ff.init();

})(jQuery, window);