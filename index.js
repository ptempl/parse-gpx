"use strict";

const xml2js = require('xml2js');
const fs = require('fs');
const parseTrack = require('./src/parseTrack');
/* if isfilename set to false then entire gpxpath is contained in a string
 * otherwise it points to a gpx file on the local system.
 * isfilename is optional argument with the default value of true (file path)
 */

module.exports = (gpxpath, isfilename = true) => {
    if (isfilename) { //gpxpath sent as a filename
        return new Promise((res, rej) => {
            fs.readFile(gpxpath, 'utf8', (err, data) => {
                if (err) {
                    rej(err);
                    return;
                }

                let parser = new xml2js.Parser();
                parser.parseString(data, (err, xml) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(parseTrack(xml.gpx.trk));
                    }
                });
            });
        });
    } else { //gpx path is sent as a large string
        return new Promise((res, rej) => {
            let parser = new xml2js.Parser();
            parser.parseString(gpxpath, (err, xml) => {
                if (err) {
                    rej(err);
                } else {
                    res(parseTrack(xml.gpx.trk));
                }
            });
        });
    }
};
