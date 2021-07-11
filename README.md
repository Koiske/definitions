# Plugin: `discourse definitions`

Highlights words in posts that show the definition of said word in a modal when tapping on them.

---

## Features

- Adds an admin widget on the plugin page at `%BASEURL%/admin/plugins/glossary` that allows an admin user to construct a glossary of words, for each forum locale separately.

  <img src=docs/definitions-glossary.png width=60%>

  - The "Word" entry defines what phrase is highlighted in posts.
  - The "Definition" entry defines what pops up in the modal window whenever the user taps the highlighted phrase.
  - The "Language" entry defines for which locale(s) the phrase will be highlighted with that given definition. Only users who have a matching forum locale will see the respective definitions.
  - Definitions can be deleted or edited via the respective buttons on each line.
  
- Whenever a user browses the forum, all the glossary entries that are applicable for the user's locale will be highlighted in the contents of posts. Titles are unaffected.

  <img src=docs/definitions-highlight.png width=60%>

- When clicking / tapping on such highlighted phrases, a modal window will appear showing the definition as above.

  <img src=docs/definitions-modal.png width=60%>

- Users can turn off the functionality of posts being highlighted through the modal and in User > Preferences > Interface.

  <img src=docs/definitions-preferences.png width=60%>

---

## Impact

### Community

Community members that are not well-versed in the jargon of Roblox development now have an easier time understanding certain phrases, because they can click on complicated terms to show a definition, provided that these phrases are added to the glossary for their locale of choice.

### Internal

No additional impact compared to the Community section.

### Resources

The glossary is serialized to all forum users. Whenever a post is viewed, the front-end will run through the content of the post and add decorators so that a highlight appears that can be clicked to show a definition.

This is entirely client-side and it can be turned off by the user through the checkbox on the modal or via forum preferences, as stated earlier in this README. The server-side of the forum is not impacted in any way when a user views posts for this reason.

### Maintenance

Forum staff needs to keep the definitions up-to-date, and translate (and maintain translations of) definitions for all relevant locales for the communities that are supported on the forum, as well as add locale-specific definitions where appropriate.

---

## Technical Scope

The plugin uses standard recommended functionality for extending category settings.

On the front-end, it uses the official plugin API to hook into the moment where the cooked contents of a post are being decorated. At that point the plugin parses the glossary for applicable terms, and replaces any occurrences of that term in the cooked post with a html element, which highlights the phrase and brings up a modal with the respective definition when that phrase is clicked / tapped.

The standard recommended functionality is used to add the widget for this plugin to the admin panel for plugins.

---

## Configuration

After installation, forum staff should insert all the desired definitions into the glossary at `%BASEURL%/admin/plugins/glossary`.
