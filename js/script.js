const { createApp } = Vue

createApp({
  data() {
    return {
      results: [],
      active: [],
      data: [[],[],[],[],[],[],[],[]],
    }
  },

  methods: {
    search: function(text, index) {
      var id;
      fetch('https://www.balldontlie.io/api/v1/players?search='+text)
      .then(res => res.json())
      .then(res => {
        id = res.data[0].id;
        fetch('https://www.balldontlie.io/api/v1/season_averages?player_ids[]='+id)
        .then(res => res.json())
        .then(res => {
            for(var i = 0; i<8; i++) {
                this.data.push([]);
            }
            this.data[index] = [res.data[0].pts, res.data[0].ast, res.data[0].reb, res.data[0].stl, res.data[0].blk];
        })
      })
    },

    show(index) {
      if(!this.active[index]) {
            document.getElementById("stats" + index).style.display = 'block';
            document.getElementById(index).innerHTML = "Hide Stats";
            this.active[index] = true;
        }
        else {
            document.getElementById("stats" + index).style.display = 'none';
            document.getElementById(index).innerHTML = "View Stats";
            this.active[index] = false;
        }
    }

  }
}).mount('#app')

$(document).ready(function () {

    for(var i = 0; i < 8; i++) {
      var a = document.getElementById("stats"+i).style.display = 'none';
    }


})

