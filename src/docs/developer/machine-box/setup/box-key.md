# Box keys

A box key is a secret string of characters that unlocks the boxes. You can get one for
free by visiting the Account page.

While box keys may look like your cat has walked across your keyboard, you don't usually deal
with them too much. Once set up, you can mostly forget about them.

You have to provide your key when you start a box, which you do via the [MB_KEY environment variable](#what-is-mb-key).

## What is `MB_KEY`?

`MB_KEY` is the name of an environment variable that contains your unique box key.

Every box needs an `MB_KEY` in order to run.

### Configuring the box key

Once you have copied your box key from the Account page, it is recommended that
you save it on your local development computer as an environment variable.

If you're using bash, you can add the following line to your `.bashrc` or `.bash_profile` file:

```bash
export MB_KEY=hOrRiBlE_kEy_GoEs_HeRe
```

* The `hOrRiBlE_kEy_GoEs_HeRe` text will be replaced with your own unique box key

This will mean that wherever you type `$MB_KEY` in your terminal (like when you run a box)
it will replace it with your key.

## Box key best practices

It is recommended that you keep your unique box key a secret. If your friend wants to play with a box,
they should get their own key (you can show them how easy it is).

If you need one for your company to move the boxes into production, have a system administrator sign in with a company email address.

* It's best not to commit your box key to source code repositories
* Keys should be kept secret
* It's acceptable to put the keys into cloud platform admin consoles where your boxes will run
