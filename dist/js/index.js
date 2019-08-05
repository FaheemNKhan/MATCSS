"use strict";

var _this = void 0;

/* 
*	Core JS
*
*/
var CM = {
  $: function $(arg) {
    return document.querySelector(arg);
  },
  $$: function $$(arg) {
    return document.querySelectorAll(arg);
  },
  ready: function ready(callback) {
    if (document.readyState != 'loading') {
      callback();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') {
          callback();
        }
      });
    }
  },
  openSideNav: function openSideNav() {
    CM.$('#site-drawer-overlay').classList.add('is-active');
    CM.$('#site-drawer').classList.toggle('is-active');
  },
  closeSideNav: function closeSideNav() {
    CM.$('#site-drawer-overlay').classList.remove('is-active');
    CM.$('#site-drawer').classList.remove('is-active');
  },
  sideNavSetup: function sideNavSetup() {
    var items = CM.$$(".smooth .expansion-panel-header");
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var angle = this.parentElement.querySelector('.smooth .expansion-panel-header .arrow') || null;
        this.nextElementSibling.classList.toggle('is-active');
        angle && angle.classList.toggle('f-active');

        if (this.nextElementSibling.style.height) {
          this.nextElementSibling.style.height = null;
          this.classList.remove('is-active');
        } else {
          this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + 'px';
          this.classList.add('is-active');
        }
      });
    });
  },
  toggleExpansionPanel: function toggleExpansionPanel(component) {
    component ? function () {
      var angle = CM.$(component).parentElement.querySelector('.smooth .expansion-panel-header .arrow');
      CM.$(component).nextElementSibling.classList.toggle('is-active');
      angle.classList.toggle('f-active');

      if (CM.$(component).nextElementSibling.style.height) {
        CM.$(component).classList.remove('is-active');
        CM.$(component).nextElementSibling.style.height = null;
      } else {
        CM.$(component).classList.add('is-active');
        CM.$(component).nextElementSibling.style.height = CM.$(component).nextElementSibling.scrollHeight + 'px';
      }
    }() : function () {
      CM.error('ID provided is not valid');
    }();
  },
  addRippleToDrawer: function addRippleToDrawer() {
    var dl = document.querySelectorAll('#site-drawer .list-item');
    Array.from(dl).forEach(function (l) {
      l.classList.add('waves-effect');
    });
  },
  scrollSetup: function scrollSetup() {
    window.addEventListener('scroll', function (e) {
      var st = window.pageYOffset || this.document.documentElement.scrollTop;

      if (document.documentElement.scrollTop > 400 || document.body.scrollTop > 400) {
        CM.$('#btnTop').classList.add('active');
      } else {
        CM.$('#btnTop').classList.remove('active');
      }
    });
    CM.$('#btnTop').addEventListener('click', function () {
      CM.$('#site-wrapper').scrollIntoView({
        behavior: 'smooth'
      });
    });
  },
  activateLink: function activateLink(el) {
    var allLinks = CM.$$("#site-drawer .list-item-title");

    for (var i = 0; i < allLinks.length; i++) {
      if (allLinks[i].textContent == el) {
        allLinks[i].parentElement.parentElement.classList.add('is-active');
        break;
      }
    }
  },
  selectText: function selectText(element) {
    var doc = document,
        text = element,
        range,
        selection;

    if (doc.body.createTextRange) {
      //ms
      range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      //all others
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  },
  initCodeCopy: function initCodeCopy() {
    var btnCopy = document.querySelectorAll('.btnCopy'),
        that = _this,
        max = btnCopy.length;

    for (var i = 0; i < max; i++) {
      btnCopy[i].onclick = function () {
        that.selectText(this.nextElementSibling);
      };
    }
  }
};
var app = new Vue({
  el: '#site-wrapper',
  data: {
    vDrawerActive: false,
    vDark: false
  },
  methods: {
    backToTop: function backToTop() {
      CM.$('#site-wrapper').scrollIntoView(true);
    },
    applyDarkTheme: function applyDarkTheme() {
      this.vDark = true;
    },
    toggleTheme: function toggleTheme() {
      if (!this.vDark) {
        document.body.setAttribute('id', 'dark');
        this.applyDarkTheme();
      } else {
        document.body.removeAttribute('id', 'dark');
        this.vDark = false;
      }
    }
  }
});
CM.ready(function () {
  CM.sideNavSetup();
  Waves.init({
    duration: 1000
  });
  CM.addRippleToDrawer();
  CM.scrollSetup();
  CM.initCodeCopy();
});