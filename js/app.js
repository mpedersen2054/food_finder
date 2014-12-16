(function($, window) {

    var ff = ff || {

        init: function() {
            this.searchForm = $('#search');
            this.searchBtn = $('#search').find('.btn');
            this.foodInp = $('#food');
            this.cityInp = $('#city');
            this.stateInp = $('#state');
            this.stateInp.html(usStateData)
            this.binding();
        },

        binding: function() {
            this.searchForm.on('submit', $.proxy(this.formSubmit, this));
        },

        formSubmit: function(e) {
            var food = this.foodInp.val(),
                city = this.cityInp.val(),
                state = this.stateInp.val()
                info = [food, city, state]

            if ( food && city && state ) {
                console.log(info)
            } else {
                alert('not working')
            }
            e.preventDefault();
        }

    }

    ff.init();

    console.log(ff)

})(jQuery, window);