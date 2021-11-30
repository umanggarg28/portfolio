import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import "@lottiefiles/lottie-player";


function App() {

  const [navSize, setnavSize] = useState("3rem");
  const [navColor, setnavColor] = useState("transparent");

  useEffect(() => {

    const listenScrollEvent = () => {
      console.log("fired");
      // window.pageYOffset > 10 ? setnavColor("#fff") : setnavColor("black");
      // window.pageYOffset > 10 ? setnavSize("5rem") : setnavSize("10rem");
    };

  //   var cursor = {
  //     delay: 8,
  //     _x: 0,
  //     _y: 0,
  //     endX: (window.innerWidth / 2),
  //     endY: (window.innerHeight / 2),
  //     cursorVisible: true,
  //     cursorEnlarged: false,
  //     $dot: document.querySelector('.cursor-dot'),
  //     $outline: document.querySelector('.cursor-dot-outline'),
      
  //     init: function() {
  //         // Set up element sizes
  //         this.dotSize = this.$dot.offsetWidth;
  //         this.outlineSize = this.$outline.offsetWidth;
          
  //         this.setupEventListeners();
  //         this.animateDotOutline();
  //     },
      
  //     setupEventListeners: function() {
  //         var self = this;
          
  //         // Anchor hovering
  //         document.querySelectorAll('a').forEach(function(el) {
  //             el.addEventListener('mouseover', function() {
  //                 self.cursorEnlarged = true;
  //                 self.toggleCursorSize();
  //             });
  //             el.addEventListener('mouseout', function() {
  //                 self.cursorEnlarged = false;
  //                 self.toggleCursorSize();
  //             });
  //         });
          
  //         // Click events
  //         document.addEventListener('mousedown', function() {
  //             self.cursorEnlarged = true;
  //             self.toggleCursorSize();
  //         });
  //         document.addEventListener('mouseup', function() {
  //             self.cursorEnlarged = false;
  //             self.toggleCursorSize();
  //         });
    
    
  //         document.addEventListener('mousemove', function(e) {
  //             // Show the cursor
  //             self.cursorVisible = true;
  //             self.toggleCursorVisibility();
  
  //             // Position the dot
  //             self.endX = e.pageX;
  //             self.endY = e.pageY;
  //             self.$dot.style.top = self.endY + 'px';
  //             self.$dot.style.left = self.endX + 'px';
  //         });
          
  //         // Hide/show cursor
  //         document.addEventListener('mouseenter', function(e) {
  //             self.cursorVisible = true;
  //             self.toggleCursorVisibility();
  //             self.$dot.style.opacity = 1;
  //             self.$outline.style.opacity = 1;
  //         });
          
  //         document.addEventListener('mouseleave', function(e) {
  //             self.cursorVisible = true;
  //             self.toggleCursorVisibility();
  //             self.$dot.style.opacity = 0;
  //             self.$outline.style.opacity = 0;
  //         });
  //     },
      
  //     animateDotOutline: function() {
  //         var self = this;
          
  //         self._x += (self.endX - self._x) / self.delay;
  //         self._y += (self.endY - self._y) / self.delay;
  //         self.$outline.style.top = self._y + 'px';
  //         self.$outline.style.left = self._x + 'px';
          
  //         requestAnimationFrame(this.animateDotOutline.bind(self));
  //     },
      
  //     toggleCursorSize: function() {
  //         var self = this;
          
  //         if (self.cursorEnlarged) {
  //             self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
  //             self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
  //         } else {
  //             self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
  //             self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
  //         }
  //     },
      
  //     toggleCursorVisibility: function() {
  //         var self = this;
          
  //         if (self.cursorVisible) {
  //             self.$dot.style.opacity = 1;
  //             self.$outline.style.opacity = 1;
  //         } else {
  //             self.$dot.style.opacity = 0;
  //             self.$outline.style.opacity = 0;
  //         }
  //     }
  // }
  
  // cursor.init();


    // window.addEventListener("scroll", listenScrollEvent);
    // return () => {
    //   window.removeEventListener("scroll", listenScrollEvent);
    // };

  }, []);

  return (
    <BrowserRouter>
    <NavBar navColor={navColor} navSize={navSize}/>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={NavBar} path="/page" exact />
        <Route render={() => <Redirect to="/" />} />
        {/* <Route component={About} path="/about" />
        <Route component={Experience} path="/experience" />
        <Route component={Education} path="/education" />
        <Route component={Skills} path="/skills" />
        <Route component={SinglePost} path="/post/:slug" />
        <Route component={Post} path="/post" />
        <Route component={Project} path="/project" /> */}
      </Switch>
      <div orientation="left" class="side__StyledSideElement-sc-1duznzb-0 hOvuuP">
        <ul class="social__StyledSocialList-anu6nt-0 dVLQAC fade-enter-done">
          <li><a href="https://github.com/ug1086" aria-label="GitHub" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a></li>
          <li><a href="https://www.instagram.com/umanggarg28" aria-label="Instagram" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><title>Instagram</title><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a></li>
          <li><a href="https://twitter.com/GargUmang7" aria-label="Twitter" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><title>Twitter</title><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a></li>
          <li><a href="https://www.linkedin.com/in/umanggarg28" aria-label="Linkedin" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><title>LinkedIn</title><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a></li>
          <li><a href="https://codepen.io/" aria-label="Codepen" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-codepen"><title>CodePen</title><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line></svg></a></li>
        </ul>
      </div>
      <div orientation="right" class="side__StyledSideElement-sc-1duznzb-0 jSIwrL">
        <div class="email__StyledLinkWrapper-sc-2epoq-0 jJFfEJ fade-enter-done">
          <a href="mailto:umanggarg28@gmail.com">umanggarg28@gmail.com</a>
        </div>
      </div>
      {/* <div class="cursor-dot-outline"></div>
      <div class="cursor-dot"></div> */}
    </BrowserRouter>
  )
}

export default App;
