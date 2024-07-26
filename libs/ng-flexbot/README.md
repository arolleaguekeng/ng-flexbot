# ng-flexbot

![ng-flexbot Logo](https://github.com/arolleaguekeng/ng-flexbot/blob/master/ng-flexbot-logo.png)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![npm version](https://img.shields.io/npm/v/ng-flexbot)](https://www.npmjs.com/package/ng-flexbot)
[![GitHub pull request check state](https://img.shields.io/github/status/s/pulls/arolleaguekeng/ng-flexbot/15)](https://github.com/arolleaguekeng/ng-flexbot/pulls)

Welcome to `ng-flexbot`! 🚀

**ng-flexbot** is an open-source Angular UI library designed to create chatbots with just a few lines of code. It allows you to select from various models, such as GPT and Google Gemini, and customize the chatbot’s behavior using a prompt context.

## Why ng-flexbot?

Are you looking for a streamlined way to integrate chatbots into your Angular applications? **ng-flexbot** simplifies this process by providing an easy-to-use UI component that integrates with popular language models. With ng-flexbot, you can:

- Quickly add a chatbot to your Angular app with minimal setup.
- Choose from a range of language models, including GPT and Google Gemini.
- Customize the chatbot’s focus with a prompt context.

And that’s not all! We’re continuously improving ng-flexbot and have exciting plans for future updates.

## Key Features

- **Easy Integration:** Simple setup with a few lines of code.
- **Model Selection:** Choose from various language models, including:
  - [OpenAI GPT](https://platform.openai.com/)
  - [Google Gemini](https://cloud.google.com/gemini)
- **Prompt Context:** Define the subject the chatbot will focus on.

## Installation

To get started with `ng-flexbot`, install it as an npm package:

```bash
npm install ng-flexbot
```

## Usage

Here’s a quick example of how to use `ng-flexbot` in your Angular project:

write this configuration on your `app.config.ts` file

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), provideMarkdown()],
};
```

### HTML

```html
<div class="container">
  <lib-ng-flexbot
   [googleApikey]="googleApikey" 
   [openaiApikey]="openaiApikey" 
   [promptContext]="promptContext" 
   [textModel]="textModel" 
   [imageModel]="imageModel" 
   [title]="title" 
   [welcomeMessage]="welcomeMessage"
  />
</div>
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { FlexbotCurrentTextModel, FlexbotCurrentImageModel } from 'ng-flexbot';
import { environment } from '../environments/environment';

@Component({
  standalone: true,
  imports: [NgFlexbotComponent],
  selector: 'app-root',
    styles: [
    `
      .container {
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  title = 'flexbot-demo';
  googleApikey = environment.googleApiKey;
  openaiApikey = environment.openaiApiKey;
  promptContext = "you only know questions about Angular"
  textModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
  imageModel = FlexbotCurrentImageModel.OPEN_AI_GPT_4o_MINI;
  welcomeMessage = "Welcome to Flexbot!";
}
```

## API Keys

To use `ng-flexbot`, you need API keys for the selected language models. You can obtain these keys from the following platforms:

- [OpenAI](https://platform.openai.com/)
- [Google Gemini](https://cloud.google.com/gemini)

## Available Models

**ng-flexbot** supports the following models:

### Text Models

- **Google Models**

  - `GOOGLE_GEMINI_PRO` (`google/gemini-pro`)
  - `GOOGLE_MEDULLA_2` (`google/medulla-2`)

- **OpenAI models**
  - `OPEN_AI_GPT_3` (`openai/gpt-3`)
  - `OPEN_AI_GPT_3_CHAT` (`openai/gpt-3-chat`)
  - `OPEN_AI_GPT_4` (`openai/gpt-4`)
  - `OPEN_AI_GPT_4_TURBO` (`openai/gpt-4-turbo`)
  - `OPEN_AI_GPT_3_5_TURBO` (`openai/gpt-3.5-turbo`)
  - `OPEN_AI_TEXT_DAVINCI_003` (`openai/text-davinci-003`)

### Image Models

- **Google Models**

  - `GOOGLE_GEMINI_1_5_FLASH` (`google/gemini-1.5-flash`)

- **OpenAI Models**
  - `OPEN_AI_DALL_E_3` (`openai/dall-e-3`)
  - `OPEN_AI_DALL_E_2` (`openai/dall-e-2`)

## Contributions

We welcome contributions from the community! Since `ng-flexbot` is a monorepo created with Nx, please follow these steps to contribute:

1. Fork this repository.
2. Clone your fork and navigate to the `ng-flexbot` directory:
   ```bash
   git clone https://github.com/your-username/ng-flexbot.git
   cd ng-flexbot
   ```
3. Install dependencies and set up the Nx workspace:
   ```bash
   npm install
   npx nx install
   ```
4. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Make your changes and test them using Nx commands:
   ```bash
   npx nx test
   npx nx build
   ```
6. Commit your changes:
   ```bash
   git commit -m 'Adding a new feature'
   ```
7. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a pull request on GitHub.

**We appreciate all contributions, big or small!**

## License

This project is licensed under the MIT License. For more details, see the [LICENSE.md](https://github.com/arolleaguekeng/ng-flexbot/blob/master/LICENSE.md) file or visit the [MIT License Website](https://choosealicense.com/licenses/mit/).

## Feedback

If you have any feedback, please reach out to us at [arolleaguekeng@gmail.com](mailto:arolleaguekeng@gmail.com).

#Angular #Chatbot #OpenSource #UI #JavaScript #Innovation #gemini #chatgpt #AngularLibrary #ChatbotUI
#AngularComponents
#DeveloperTools #AI
#MachineLearning
#GPT
#GoogleGemini
