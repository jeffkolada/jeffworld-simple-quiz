import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'

/**
 * This is the main entry point for your plugin.
 *
 * All information regarding plugin development can be found at
 * https://developer.vatom.com/spaces/plugins-in-spaces/guide-create-plugin
 *
 * @license MIT
 * @author JEFFWORLD
 * written by Jeff & AI
 */


export default class PromptPlugin extends BasePlugin {

    /** Plugin info */
    static id = "prompt";
    static name = "Prompt Plugin";
    static description = "Opens a prompt when the component is clicked.";

    /** Called on load */
    onLoad() {
        // Register component as an attachable component
        this.objects.registerComponent(PromptComponent, {
            id: 'prompt-component',
            name: 'Prompt Component',
            description: 'Opens a prompt when the component is clicked.'
        });
    }
}

/**
 * Component that opens a prompt when clicked.
 */
class PromptComponent extends BaseComponent {

    /** Called when the component is clicked */
    async onClick() {
        try {
            // Open prompt with specified properties
            const value = await this.menus.prompt({
                icon: 'info',
                title: 'Welcome!',
                text: 'Please enter your name below',
                inputType: 'text',
                initialValue: 'My Name',
                placeholder: 'Type something...'
            });
            console.log(value); // Log the value received from the prompt
        } catch (error) {
            console.error('Error opening prompt:', error);
        }
    }
}
