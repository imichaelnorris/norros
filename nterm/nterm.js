import { Nosh } from "../nosh/nosh.js";

export const name = 'nterm';

export { NTerm }

// This is the UI stuff.
// Nosh is more like the controller and a bunch of programs for NTerm.
class NTerm {
    static defaultUIOptions = {
        padding: "4px",
    };

    // Pass in the HTML element which will have a terminal instantiated inside.
    constructor(elem, uiOptions) {
        if (typeof (elem) === 'string') {
            elem = document.querySelector(elem);
        }

        this.setUIOptions(uiOptions);

        this.prompt = 'NorrOS \x1B[1;3;31mNorrOS\x1B[0m $ ';
        this.nosh = new Nosh(this);
        this.init(elem);
    }

    setUIOptions(uiOptions) {
        if (typeof (uiOptions) === 'undefined') {
            uiOptions = NTerm.defaultUIOptions;
        } else {
            uiOptions = { ...NTerm.defaultUIOptions, ...uiOptions };
        }
        this.uiOptions = uiOptions;
    }

    init(elem, startingDir) {
        if (typeof (startingDir) === 'undefined') {
            startingDir = '/home/user';
        }
        this.term = new window.Terminal(
            {
                allowProposedApi: true,
                cursorBlink: true
            }
        );
        this.term.onData((e) => this.onData(e));
        this.term.open(elem);
        this.term.focus();
        this.term.element.style.padding = `${this.uiOptions.padding}`;

        // TODO: make sure this actually exists? Maybe not though! There's no rules.
        this.nosh.cwd = startingDir;

        this.nosh.showPrompt();
    }

    showPrompt() {
        throw Error("Remove nterm.showPrompt()");
        this.resetCommand();
        this.term.write(this.prompt, () => {
            this.term.promptLength = this.term._core.buffer.x;
        });
    }

    resetCommand() {
        this.command = '';
        return new Promise((resolve) => resolve());
    }

    onData(e) {
        var term = this.term;
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C\r\n', () => this.nosh.showPrompt());
                break;
            case '\r': // Enter
                this.onEnter();
                break;
            case '\u007F': // Backspace (DEL)
                console.log('backspace');
                // Do not delete the prompt
                if (term._core.buffer.x > term.promptLength) {
                    term.write('\b \b');
                    if (this.command.length > 0) {
                        this.command = this.command.substr(0, this.command.length - 1);
                    }
                }
                break;
            case '\u0009':
                // what do?
                // console.log('tabbed', output, ["dd", "ls"]);
                break;
            default:
                if (e >= String.fromCharCode(37) && e <= String.fromCharCode(40)) {
                    this.arrow(e);
                }

                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    this.command += e;
                    term.write(e);
                }
        }
    }

    arrow(e) {
        switch (e) {
            case 37: // Left
                break;
            case 38: // Up
                break;
            case 39: // Right
                break;
            case 40: // Down
                break;
            default:
                throw Error(`NTerm.arrow: ${e} is not an arrow key code`);
        }
    }

    onEnter() {
        this.nosh.onEnter();
    }

    get options() {
        return this.term.options;
    }

    get parser() {
        return this.term.parser;
    }

    // Add a window.load event to start the terminal, good for standalone usages of nterm.
    // Example:
    // Mterm.createOnLoad(document.querySelector('div.terminal'));
    static createOnLoad(querySelector) {
        window.addEventListener('load', (event) => {
            // This is how you would instantiate 
            window.nterm = new NTerm(querySelector);
        });
    }
}