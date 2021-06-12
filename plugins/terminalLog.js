var styles = {
  reset: '\x1B[0m',
  bold: '\x1B[1m',
  dim: "\x1b[2m",
  italic: '\x1B[3m',
  underline: '\x1B[4m',
  blink: "\x1b[5m",
  inverse: '\x1B[7m',
  hidden: "\x1b[8m",
  strikethrough: '\x1B[9m',
  // 前景色
  grey: '\x1B[90m',
  black: '\x1B[30m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
  white: '\x1b[37m',
  crimson: "\x1b[38m",
  // 背景色
  blackBG: '\x1B[40m',
  redBG: '\x1B[41m',
  greenBG: '\x1B[42m',
  crimsonBG: '\x1B[43m',
  blueBG: '\x1B[44m',
  magentaBG: '\x1B[45m',
  cyanBG: '\x1B[46m',
  whiteBg: '\x1B[47m',
  crimsonBg: '\x1B[48m',
};

let currentOptions = {
  fg: '',
  bg: '',
  msg: '',
};

function parseOptions(msg) {
  if (msg instanceof Object) {
    return msg;
  }
  return { msg };
}

const createdLooger = function (options) {
  if (options.fg && options.bg) {
    console.log('\t');
    console.log(styles[options.fg], styles[options.bg], options.msg, styles.reset);
    console.log('\t');
  } else if (options.fg) {
    console.log('\t');
    if (options.fg === 'red') {
      console.log(styles[options.fg], 'Error Message:');
    }
    console.log(styles[options.fg], options.msg, styles.reset);
    console.log('\t');
  } else if (options.bg) {
    console.log('\t');
    console.log(styles[options.bg], options.msg, styles.reset);
    console.log('\t');
  } else {
    console.log(options.msg);
  }
};

const Looger = function (options) {
  options = parseOptions(options);
  options = {
    ...currentOptions,
    ...options,
  };
  createdLooger(options);
};

const createLoogerMethods = (key) => (msg) => {
  Looger({
    fg: key,
    msg: msg,
  });
};

[{
  key: 'warn',
  fg: 'yellow',
}, {
  key: 'error',
  fg: 'red'
}].forEach((item) => {
  Looger[item.key] = createLoogerMethods(item.fg);
});

// export default Looger;
module.exports = Looger;

// console.log(styles.strikethrough, '测试信息');