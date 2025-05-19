# Spoiler Avoider
A Firefox extension for avoiding spoilers for TV shows, movies, etc. After you
enter the keywords you wish to avoid, sections of webpages that mention those 
keywords will be redacted (i.e. hidden with black bars). Beyond maintaining 
surprise before you watch the latest episode of your favorite HBO show, you could
also use this extension to hide references to anything you don't want to read
about, from spiders to pinochle.

## How to use
Open your Firefox browser extensions and click the icon to run. You'll be taken
to the Preferences tab of the Spoiler Avoider extension. In the text box, enter
each keyword or phrase you wish to avoid on its own line. Click save. You may
need to reload open tabs if you wish to redact them. Note that keywords are 
case insensitive, but whitespace is preserved, and punctuation will not be stripped.

The extension works by altering the CSS of the elements that contain the saved 
keywords. So if a keyword would have appeared in a block of text on a webpage, 
this extension would black out that entire block of text, not just the keyword.

## Does it only work on text?
Redacting text seems to be much more straightforward, but the extension will block
some images as well. Use caution if you visit websites known to feature spoiler-heavy
images, however.
