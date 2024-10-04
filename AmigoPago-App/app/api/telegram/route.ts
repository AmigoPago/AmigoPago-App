import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf'; // Import session from telegraf

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const bot = new Telegraf(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// Define messages in JSON objects
const messages = {
  en: {
    welcome: 'Welcome to Amigo Pago! Fast, secure and easy to use wallet for local and international payments. \nPlease select an option:',
    amigo_pago_info: 'Learn About Amigo Pago',
    amigo_pago_app: 'Amigo Pago App',
  },
};

// Handle '/start' command (initial interaction)
bot.start((ctx) => {

    const imagePath = `${baseUrl}/images/AmigoPago.png`;
 
    ctx.replyWithPhoto(imagePath, {
        caption: messages.en.welcome,
        reply_markup: {
          inline_keyboard: [
            [{ text: messages.en.amigo_pago_info, callback_data: 'amigo_pago_info' }],
            [{ text: messages.en.amigo_pago_app, callback_data: 'amigo_pago_app', url: process.env.NEXT_PUBLIC_TELEGRAM_APP_URL as string }],
          ],
        },
      });  
});

// Handle callback queries
bot.on('callback_query', async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  //const userId = ctx.from.id;

  console.log(callbackData);

if (callbackData === 'amigo_pago_info') {
    await ctx.reply('Why Choose Amigo Pago?:\n 1. Fast, secure and easy to use wallet for local and international payments.\n 2. Easy to use app for sending and receiving payments.\n 3. Easy to use web app for sending and receiving payments.');
  }
  // ... (Handle other callback queries)
});

// Handle generic text messages
//bot.on('text', async (ctx) => {
  // const userMessage = ctx.message.text;
//});

// Handle other commands or messages
// ... (Implement logic to process user input, generate recommendations, etc.)
// Handle messages (integrate OpenAI)

export async function POST(request: NextRequest) {
  try {
    // Parse incoming webhook request from Telegram
    const body = await request.json();

    // Pass the update to Telegraf for processing
    await bot.handleUpdate(body);

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    return new NextResponse('Error', { status: 500 });
  }
}