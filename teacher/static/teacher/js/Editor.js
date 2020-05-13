$(document).ready(function () {
 var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small','20px', 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': ['yakan', 'mitra'] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});




    // var quill = new Quill('#editor-container', {
    //     //     modules: {
    //     //         toolbar: '#toolbar-container'
    //     //     },
    //     //     theme: 'snow'
    //     // });

    // var Font = Quill.import('formats/font');
    // Font.whitelist = ['yakan', 'mitra'];
    // Quill.register(Font, true);


    // $(".ql-snow").click(function () {
    //     $("#toolbar-container").addClass('toolbar-container-show');
    // });
    // $(".question-textarea-label").click(function () {
    //     $("#toolbar-container").removeClass('toolbar-container-show');
    // });
    // $(".ql-picker-label").html("<span class='ti-angle-down'></span>");

});