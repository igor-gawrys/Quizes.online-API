module.exports = {
        // Export options
        "directory": "/tmp",       // The directory the file gets written into if not using .toFile(filename, callback). default: '/tmp'
       
        // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
        "height": "10.5in",        // allowed units: mm, cm, in, px
        "width": "8in",            // allowed units: mm, cm, in, px
    
        "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait", // portrait or landscape
       
        // Page options
        "border": "0",             // default is 0, units: mm, cm, in, px
};