// polyfills.js
import { Buffer } from 'buffer';
import process from 'process';
import crypto from 'crypto-browserify';
import stream from 'stream-browserify';
import path from 'path-browserify';

window.Buffer = Buffer;
window.process = process;
window.crypto = crypto;
window.stream = stream;
window.path = path;

export { Buffer, process, crypto, stream, path };