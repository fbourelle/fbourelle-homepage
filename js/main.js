function main() {

  window.onscroll = function() {myFunction()};
  function myFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          document.getElementById("img-frederic").className = "avatar-sticky";
          // console.log("coucou");
      } else {
        document.getElementById("img-frederic").className = "avatar";
          // console.log("glfdhgmoidf");
      }
  }
}
main();
