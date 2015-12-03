import jsdom from 'jsdom';
import chai from 'char';
import chaiImmutable from 'chaiImmutable';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.window = win;
global.document = doc;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
