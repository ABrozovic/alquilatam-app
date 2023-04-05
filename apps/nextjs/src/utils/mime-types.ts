export type CommonMimeTypes = keyof typeof commonMimeTypes;
export const commonMimeTypes = {
  "application/atom+xml": {
    extensions: ["atom"],
  },
  "application/java-archive": {
    extensions: ["jar", "war", "ear"],
  },
  "application/javascript": {
    extensions: ["js"],
  },
  "application/json": {
    extensions: ["json"],
  },
  "application/mac-binhex40": {
    extensions: ["hqx"],
  },
  "application/msword": {
    extensions: ["doc"],
  },
  "application/octet-stream": {
    extensions: [
      "bin",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
    ],
  },
  "application/pdf": {
    extensions: ["pdf"],
  },
  "application/postscript": {
    extensions: ["ps", "eps", "ai"],
  },
  "application/rss+xml": {
    extensions: ["rss"],
  },
  "application/rtf": {
    extensions: ["rtf"],
  },
  "application/vnd.apple.mpegurl": {
    extensions: ["m3u8"],
  },
  "application/vnd.google-earth.kml+xml": {
    extensions: ["kml"],
  },
  "application/vnd.google-earth.kmz": {
    extensions: ["kmz"],
  },
  "application/vnd.ms-excel": {
    extensions: ["xls"],
  },
  "application/vnd.ms-fontobject": {
    extensions: ["eot"],
  },
  "application/vnd.ms-powerpoint": {
    extensions: ["ppt"],
  },
  "application/vnd.oasis.opendocument.graphics": {
    extensions: ["odg"],
  },
  "application/vnd.oasis.opendocument.presentation": {
    extensions: ["odp"],
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    extensions: ["ods"],
  },
  "application/vnd.oasis.opendocument.text": {
    extensions: ["odt"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    extensions: ["pptx"],
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    extensions: ["xlsx"],
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    extensions: ["docx"],
  },
  "application/vnd.wap.wmlc": {
    extensions: ["wmlc"],
  },
  "application/wasm": {
    extensions: ["wasm"],
  },
  "application/x-7z-compressed": {
    extensions: ["7z"],
  },
  "application/x-cocoa": {
    extensions: ["cco"],
  },
  "application/x-java-archive-diff": {
    extensions: ["jardiff"],
  },
  "application/x-java-jnlp-file": {
    extensions: ["jnlp"],
  },
  "application/x-makeself": {
    extensions: ["run"],
  },
  "application/x-perl": {
    extensions: ["pl", "pm"],
  },
  "application/x-pilot": {
    extensions: ["prc", "pdb"],
  },
  "application/x-rar-compressed": {
    extensions: ["rar"],
  },
  "application/x-redhat-package-manager": {
    extensions: ["rpm"],
  },
  "application/x-sea": {
    extensions: ["sea"],
  },
  "application/x-shockwave-flash": {
    extensions: ["swf"],
  },
  "application/x-stuffit": {
    extensions: ["sit"],
  },
  "application/x-tcl": {
    extensions: ["tcl", "tk"],
  },
  "application/x-x509-ca-cert": {
    extensions: ["der", "pem", "crt"],
  },
  "application/x-xpinstall": {
    extensions: ["xpi"],
  },
  "application/xhtml+xml": {
    extensions: ["xhtml"],
  },
  "application/xspf+xml": {
    extensions: ["xspf"],
  },
  "application/zip": {
    extensions: ["zip"],
  },
  "audio/midi": {
    extensions: ["mid", "midi", "kar"],
  },
  "audio/mpeg": {
    extensions: ["mp3"],
  },
  "audio/ogg": {
    extensions: ["ogg"],
  },
  "audio/x-m4a": {
    extensions: ["m4a"],
  },
  "audio/x-realaudio": {
    extensions: ["ra"],
  },
  "font/woff": {
    extensions: ["woff"],
  },
  "font/woff2": {
    extensions: ["woff2"],
  },
  "image/avif": {
    extensions: ["avif"],
  },
  "image/gif": {
    extensions: ["gif"],
  },
  "image/jpeg": {
    extensions: ["jpeg", "jpg"],
  },
  "image/png": {
    extensions: ["png"],
  },
  "image/svg+xml": {
    extensions: ["svg", "svgz"],
  },
  "image/tiff": {
    extensions: ["tif", "tiff"],
  },
  "image/vnd.wap.wbmp": {
    extensions: ["wbmp"],
  },
  "image/webp": {
    extensions: ["webp"],
  },
  "image/x-icon": {
    extensions: ["ico"],
  },
  "image/x-jng": {
    extensions: ["jng"],
  },
  "image/x-ms-bmp": {
    extensions: ["bmp"],
  },
  "text/css": {
    extensions: ["css"],
  },
  "text/html": {
    extensions: ["html", "htm", "shtml"],
  },
  "text/mathml": {
    extensions: ["mml"],
  },
  "text/plain": {
    extensions: ["txt"],
  },
  "text/vnd.sun.j2me.app-descriptor": {
    extensions: ["jad"],
  },
  "text/vnd.wap.wml": {
    extensions: ["wml"],
  },
  "text/x-component": {
    extensions: ["htc"],
  },
  "text/xml": {
    extensions: ["xml"],
  },
  "video/3gpp": {
    extensions: ["3gpp", "3gp"],
  },
  "video/mp2t": {
    extensions: ["ts"],
  },
  "video/mp4": {
    extensions: ["mp4"],
  },
  "video/mpeg": {
    extensions: ["mpeg", "mpg"],
  },
  "video/quicktime": {
    extensions: ["mov"],
  },
  "video/webm": {
    extensions: ["webm"],
  },
  "video/x-flv": {
    extensions: ["flv"],
  },
  "video/x-m4v": {
    extensions: ["m4v"],
  },
  "video/x-mng": {
    extensions: ["mng"],
  },
  "video/x-ms-asf": {
    extensions: ["asx", "asf"],
  },
  "video/x-ms-wmv": {
    extensions: ["wmv"],
  },
  "video/x-msvideo": {
    extensions: ["avi"],
  },
} ;

const acceptedMimeTypes = [
  "application/atom+xml",
  "application/java-archive",
  "application/javascript",
  "application/json",
  "application/mac-binhex40",
  "application/msword",
  "application/octet-stream",
  "application/pdf",
  "application/postscript",
  "application/rss+xml",
  "application/rtf",
  "application/vnd.apple.mpegurl",
  "application/vnd.google-earth.kml+xml",
  "application/vnd.google-earth.kmz",
  "application/vnd.ms-excel",
  "application/vnd.ms-fontobject",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.graphics",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.wap.wmlc",
  "application/wasm",
  "application/x-7z-compressed",
  "application/x-cocoa",
  "application/x-java-archive-diff",
  "application/x-java-jnlp-file",
  "application/x-makeself",
  "application/x-perl",
  "application/x-pilot",
  "application/x-rar-compressed",
  "application/x-redhat-package-manager",
  "application/x-sea",
  "application/x-shockwave-flash",
  "application/x-stuffit",
  "application/x-tcl",
  "application/x-x509-ca-cert",
  "application/x-xpinstall",
  "application/xhtml+xml",
  "application/xspf+xml",
  "application/zip",
  "audio/midi",
  "audio/mpeg",
  "audio/ogg",
  "audio/x-m4a",
  "audio/x-realaudio",
  "font/woff",
  "font/woff2",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/vnd.wap.wbmp",
  "image/webp",
  "video/3gpp",
  "video/3gpp2",
  "video/avi",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-flv",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/mp4"
  ];