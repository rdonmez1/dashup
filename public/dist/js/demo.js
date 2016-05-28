/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */


var modalbox;
modalbox = modalbox || (function () {
    return {
        show: function(modal) {
          modal.modal("show");
        },
        hide: function (modal) {
          modal.modal('hide');
        },
    };
})();

function getSuccessAlert(msg) {
   return "<div class=\"alert alert-dismissable alert-success\">"+
      "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"+
      ""+ msg +""+ 
    "</div>";
}

function getDangerAlert(msg) {
   return "<div class=\"alert alert-dismissable alert-danger\">"+
      "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"+
      ""+ msg +"" +
    "</div>";
}

function getErrorCallout(msg) {
  return "<div class=\"callout callout-danger\">"+ 
        "  <h4>Error!</h4>"+
        "  <p>"+ msg +"</p>"+
        "</div>";
}

function getSuccessCallout(msg) {
  return "<div class=\"callout callout-success\">"+ 
        "  <h4>Success!</h4>"+
        "  <p>"+ msg +"</p>"+
        "</div>";
}

function getDetailModel (msg) {
 return  $("<div class=\"modal modal-default\">"+
    "<div class=\"modal-dialog\">"+
    "  <div class=\"modal-content\">"+
    "    <div class=\"modal-body\">"+
    "      "+ msg +" "+
    "    </div>"+
    "  </div><!-- /.modal-content -->"+
    "</div><!-- /.modal-dialog -->"+
  "</div>");
}

function getSuccessModal(msg) {
 return  $("<div class=\"modal modal-success\">"+
    "<div class=\"modal-dialog\">"+
    "  <div class=\"modal-content\">"+
    "    <div class=\"modal-header\">"+
    "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>"+
    "      <h4 class=\"modal-title\">Success!</h4>"+
    "    </div>"+
    "    <div class=\"modal-body\">"+
    "      "+ msg +" "+
    "    </div>"+
    "    <div class=\"modal-footer\">"+
    "      <button type=\"button\" class=\"btn btn-success pull-right\" data-dismiss=\"modal\">Close</button>"+
    "    </div>"+
    "  </div><!-- /.modal-content -->"+
    "</div><!-- /.modal-dialog -->"+
  "</div>");
}

function getErrorModal(msg) {
 return  $("<div class=\"modal modal-danger\">"+
    "<div class=\"modal-dialog\">"+
    "  <div class=\"modal-content\">"+
    "    <div class=\"modal-header\">"+
    "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>"+
    "      <h4 class=\"modal-title\">Error!</h4>"+
    "    </div>"+
    "    <div class=\"modal-body\">"+
    "      "+ msg +" "+
    "    </div>"+
    "    <div class=\"modal-footer\">"+
    "      <button type=\"button\" class=\"btn btn-danger pull-right\" data-dismiss=\"modal\">Close</button>"+
    "    </div>"+
    "  </div><!-- /.modal-content -->"+
    "</div><!-- /.modal-dialog -->"+
  "</div>");
}

function getWarningModal(msg) {
 return  $("<div class=\"modal modal-warning\">"+
    "<div class=\"modal-dialog\">"+
    "  <div class=\"modal-content\">"+
    "    <div class=\"modal-header\">"+
    "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>"+
    "      <h4 class=\"modal-title\">Error!</h4>"+
    "    </div>"+
    "    <div class=\"modal-body\">"+
    "      "+ msg +" "+
    "    </div>"+
    "    <div class=\"modal-footer\">"+
    "      <button type=\"button\" class=\"btn btn-warning pull-right\" data-dismiss=\"modal\">Close</button>"+
    "    </div>"+
    "  </div><!-- /.modal-content -->"+
    "</div><!-- /.modal-dialog -->"+
  "</div>");
}




(function ($, AdminLTE) {

  "use strict";

  /**
   * List of all the available skins
   *
   * @type Array
   */
  var my_skins = [
    "skin-blue",
    "skin-black",
    "skin-red",
    "skin-yellow",
    "skin-purple",
    "skin-green",
    "skin-blue-light",
    "skin-black-light",
    "skin-red-light",
    "skin-yellow-light",
    "skin-purple-light",
    "skin-green-light"
  ];

  //Create the new tab
  var tab_pane = $("<div />", {
    "id": "control-sidebar-theme-demo-options-tab",
    "class": "tab-pane active"
  });

  //Create the tab button
  var tab_button = $("<li />", {"class": "active"})
          .html("<a href='#control-sidebar-theme-demo-options-tab' data-toggle='tab'>"
                  + "<i class='fa fa-wrench'></i>"
                  + "</a>");

  //Add the tab button to the right sidebar tabs
  $("[href='#control-sidebar-home-tab']")
          .parent()
          .before(tab_button);

  //Create the menu
  var demo_settings = $("<div />");

  //Layout options
  demo_settings.append(
          "<h4 class='control-sidebar-heading'>"
          + "Layout Options"
          + "</h4>"
          //Fixed layout
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-layout='fixed' class='pull-right'/> "
          + "Fixed layout"
          + "</label>"
          + "<p>Activate the fixed layout. You can't use fixed and boxed layouts together</p>"
          + "</div>"
          //Boxed layout
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
          + "Boxed Layout"
          + "</label>"
          + "<p>Activate the boxed layout</p>"
          + "</div>"
          //Sidebar Toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
          + "Toggle Sidebar"
          + "</label>"
          + "<p>Toggle the left sidebar's state (open or collapse)</p>"
          + "</div>"
          //Sidebar mini expand on hover toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
          + "Sidebar Expand on Hover"
          + "</label>"
          + "<p>Let the sidebar mini expand on hover</p>"
          + "</div>"
          //Control Sidebar Toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
          + "Toggle Right Sidebar Slide"
          + "</label>"
          + "<p>Toggle between slide over content and push content effects</p>"
          + "</div>"
          //Control Sidebar Skin Toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
          + "Toggle Right Sidebar Skin"
          + "</label>"
          + "<p>Toggle between dark and light skins for the right sidebar</p>"
          + "</div>"
          );
  var skins_list = $("<ul />", {"class": 'list-unstyled clearfix'});

  //Dark sidebar skins
  var skin_blue =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Blue</p>");
  skins_list.append(skin_blue);
  var skin_black =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Black</p>");
  skins_list.append(skin_black);
  var skin_purple =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Purple</p>");
  skins_list.append(skin_purple);
  var skin_green =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Green</p>");
  skins_list.append(skin_green);
  var skin_red =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Red</p>");
  skins_list.append(skin_red);
  var skin_yellow =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Yellow</p>");
  skins_list.append(skin_yellow);

  //Light sidebar skins
  var skin_blue_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Blue Light</p>");
  skins_list.append(skin_blue_light);
  var skin_black_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Black Light</p>");
  skins_list.append(skin_black_light);
  var skin_purple_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Purple Light</p>");
  skins_list.append(skin_purple_light);
  var skin_green_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Green Light</p>");
  skins_list.append(skin_green_light);
  var skin_red_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Red Light</p>");
  skins_list.append(skin_red_light);
  var skin_yellow_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px;'>Yellow Light</p>");
  skins_list.append(skin_yellow_light);

  demo_settings.append("<h4 class='control-sidebar-heading'>Skins</h4>");
  demo_settings.append(skins_list);

  tab_pane.append(demo_settings);
  $("#control-sidebar-home-tab").after(tab_pane);

  setup();

  /**
   * Toggles layout classes
   *
   * @param String cls the layout class to toggle
   * @returns void
   */
  function change_layout(cls) {
    $("body").toggleClass(cls);
    AdminLTE.layout.fixSidebar();
    //Fix the problem with right sidebar and layout boxed
    if (cls == "layout-boxed")
      AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    if ($('body').hasClass('fixed') && cls == 'fixed') {
      AdminLTE.pushMenu.expandOnHover();
      AdminLTE.layout.activate();
    }
    AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    AdminLTE.controlSidebar._fix($(".control-sidebar"));
  }

  /**
   * Replaces the old skin with the new skin
   * @param String cls the new skin class
   * @returns Boolean false to prevent link's default action
   */
  function change_skin(cls) {
    $.each(my_skins, function (i) {
      $("body").removeClass(my_skins[i]);
    });

    $("body").addClass(cls);
    store('skin', cls);
    return false;
  }

  /**
   * Store a new settings in the browser
   *
   * @param String name Name of the setting
   * @param String val Value of the setting
   * @returns void
   */
  function store(name, val) {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(name, val);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * Get a prestored setting
   *
   * @param String name Name of of the setting
   * @returns String The value of the setting | null
   */
  function get(name) {
    if (typeof (Storage) !== "undefined") {
      return localStorage.getItem(name);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * Retrieve default settings and apply them to the template
   *
   * @returns void
   */
  function setup() {
    var tmp = get('skin');
    if (tmp && $.inArray(tmp, my_skins))
      change_skin(tmp);

    //Add the change skin listener
    $("[data-skin]").on('click', function (e) {
      e.preventDefault();
      change_skin($(this).data('skin'));
    });

    //Add the layout manager
    $("[data-layout]").on('click', function () {
      change_layout($(this).data('layout'));
    });

    $("[data-controlsidebar]").on('click', function () {
      change_layout($(this).data('controlsidebar'));
      var slide = !AdminLTE.options.controlSidebarOptions.slide;
      AdminLTE.options.controlSidebarOptions.slide = slide;
      if (!slide)
        $('.control-sidebar').removeClass('control-sidebar-open');
    });

    $("[data-sidebarskin='toggle']").on('click', function () {
      var sidebar = $(".control-sidebar");
      if (sidebar.hasClass("control-sidebar-dark")) {
        sidebar.removeClass("control-sidebar-dark")
        sidebar.addClass("control-sidebar-light")
      } else {
        sidebar.removeClass("control-sidebar-light")
        sidebar.addClass("control-sidebar-dark")
      }
    });

    $("[data-enable='expandOnHover']").on('click', function () {
      $(this).attr('disabled', true);
      AdminLTE.pushMenu.expandOnHover();
      if (!$('body').hasClass('sidebar-collapse'))
        $("[data-layout='sidebar-collapse']").click();
    });

    // Reset options
    if ($('body').hasClass('fixed')) {
      $("[data-layout='fixed']").attr('checked', 'checked');
    }
    if ($('body').hasClass('layout-boxed')) {
      $("[data-layout='layout-boxed']").attr('checked', 'checked');
    }
    if ($('body').hasClass('sidebar-collapse')) {
      $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
    }

  }

 


})(jQuery, $.AdminLTE);


function signUp (form) {
    $.ajax({
      url: $(form).attr("action"),
      method: $(form).attr("method"),
      data: $(form).serialize(),
      beforeSend: function () {
        $(".overlay").removeClass("hide");
      },
      success: function (res) {
        $(".overlay").addClass("hide");
        $("#message").html( getSuccessAlert(res.message) );
        setTimeout(function(){
          location.href = '/';
        }, 2000);
      },
      error: function (res) {
        $(".overlay").addClass("hide");
        $("#message").html( getDangerAlert(res.responseJSON.message));
      }
    });
    return false;
}

function signIn (form) {
    $.ajax({
      url: $(form).attr("action"),
      method: $(form).attr("method"),
      data: $(form).serialize(),
      beforeSend: function () {
        $(".overlay").removeClass("hide");
      },
      success: function (res) {
        $(".overlay").addClass("hide");
        $("#message").html( getSuccessAlert(res.message) );
        setTimeout(function(){
          location.href = res.return_url || "/";
        }, 2000);
      },
      error: function (res) {
        $(".overlay").addClass("hide");
        $("#message").html( getDangerAlert(res.responseJSON.message));
      }
    });
    return false;
}

function changePassword (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function changeEmail (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function forgotPassword (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = '/';
      }, 5000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function resetPassword (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = '/';
      }, 2000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function createDashboard (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = '/dashboard/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function editDashboard (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = '/dashboard/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}


function duplicateDashboard (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = '/dashboard/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function removeDashboard (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = '/';
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

$(".dashboard-select").select2({
  ajax: {
    url: "/dashboard/list",
    method:"post",
    dataType: 'json',
    delay: 250,
    maximumInputLength: 0,
    data: function (params) {
      return {
        q: params.term,
        page: params.page
      };
    },
    processResults: function (data, params) {
      params.page = params.page || 1;
      var results = [];
      $.each(data.items, function (i, v) {
          var o = {};
          o.id = v._id;
          o.title = v.title;
          o.value = v._id;
          results.push(o);
      })
      return {
        results: data.items,
        pagination: {
            more: (params.page * 50) < data.total
        }
      };
    },
    cache: true
  },
  id: function(item){ return item._id; },
  escapeMarkup: function (markup) { return markup; },
  templateResult: function (item) {
    if (item.loading)
        return item.text;
    var markup = "<a href='/dashboard/"+ item._id +"'>" + item.title + "</a>";
    return markup;
  },
  templateSelection: function (item) { return  item.title || item.text }
});


function createApp (form) {

  var formData = new FormData(form);

  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = 'edit/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function editApp (form) {
  var formData = new FormData(form);

  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}


function removeApp (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.reload();
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

$(".credential-select").select2({
  ajax: {
    url: "/credential/list",
    method:"post",
    dataType: 'json',
    delay: 250,
    maximumInputLength: 0,
    data: function (params) {
      return {
        q: params.term,
        page: params.page
      };
    },
    processResults: function (data, params) {
      params.page = params.page || 1;
      var results = [];
      $.each(data.items, function (i, v) {
          var o = {};
          o.id = v._id;
          o.text = v.name;
          o.value = v._id;
          results.push(o);
      })
      return {
        results: results,
        pagination: {
            more: (params.page * 50) < data.total
        }
      };
    }
  },
  id: function(item){ return item._id; },
  escapeMarkup: function (markup) { return markup; }
});


function changeAuthType(obj) {
  $('.auth-type').addClass('hide');
  if($(obj).val()=='basic') {
    $('#basic-container').removeClass('hide');
  }
  else if($(obj).val()=='oauth2') {
    $('#oauth2-container').removeClass('hide'); 
  }
  else if($(obj).val()=='') {
    $('.auth-type').addClass('hide');
  }
  return true;
}

function createCredential (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = 'edit/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function editCredential (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}


function removeCredential (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.reload();
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function createDataSource (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = 'edit/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function editDataSource (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}


function removeDataSource (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.reload();
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function createData (form) {
  var formData = new FormData(form);
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = 'edit/'+ res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

function editData (form) {
  var formData = new FormData(form);
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.href = res.items[0]._id;
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}


function removeData (form) {
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    data: $(form).serialize(),
    beforeSend: function () {
      $(".overlay").removeClass("hide");
    },
    success: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getSuccessAlert(res.message) );
      setTimeout(function(){
        location.reload();
      }, 1000);
    },
    error: function (res) {
      $(".overlay").addClass("hide");
      $("#message").html( getDangerAlert(res.responseJSON.message));
    }
  });
  return false;
}

$(".application-select").select2({
  ajax: {
    url: "/application/list",
    method:"post",
    dataType: 'json',
    delay: 250,
    maximumInputLength: 0,
    data: function (params) {
      return {
        q: params.term,
        page: params.page
      };
    },
    processResults: function (data, params) {
      params.page = params.page || 1;
      var results = [];
      $.each(data.items, function (i, v) {
          var o = { };
          o.id = v._id;
          o.text = v.name;
          o.value = v._id;
          results.push(o);
      })
      return {
        results: results,
        pagination: {
            more: (params.page * 50) < data.total
        }
      };
    }
  },
  id: function(item){ return item._id; },
  escapeMarkup: function (markup) { return markup; },
});

$(".datasource-select").select2({
  ajax: {
    url: "/datasource/list",
    method:"post",
    dataType: 'json',
    delay: 250,
    maximumInputLength: 0,
    data: function (params) {
      return {
        q: params.term,
        page: params.page
      };
    },
    processResults: function (data, params) {
      params.page = params.page || 1;
      var results = [];
      $.each(data.items, function (i, v) {
          var o = {};
          o.id = v._id;
          o.text = v.name;
          o.value = v._id;
          results.push(o);
      })
      return {
        results: results,
        pagination: {
            more: (params.page * 50) < data.total
        }
      };
    }
  },
  id: function(item){ return item._id; },
  escapeMarkup: function (markup) { return markup; },
}).on("select2:select", function(e) {
  $("input[name=datasources]").val( $("input[name=datasources]").val() + ","+ e.params.data.value );
  $("#datasources").append("<li class='list-group-item'>"+ e.params.data.text +"</li>");
        })
