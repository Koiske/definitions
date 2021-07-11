import showModal from "discourse/lib/show-modal"
import { withPluginApi } from "discourse/lib/plugin-api"

const MARGIN_BOTTOM = 15

const regexEscape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export default {
	name: "discourse-definitions",

	initialize() {
		if(!Discourse.SiteSettings.definitions_enabled)
			return;

		let names = Discourse.Site.currentProp("discourse_definitions") || []

		let tooltip = $("<div class='discourse-definitions-tooltip'></div>")
		$("body").append(tooltip)
		tooltip.hide()

		$(document).click(() => {
			tooltip.hide()
		})

		$(document).on("click", ".discourse-definitions-definition", function(event){
			event.stopPropagation()
			let name = $(this).attr("data-name")
			let definition = names.find((definition) => definition.word === name && definition.locale === I18n.locale)
			let modal = showModal("definition-modal")
			modal.set("name", name)
			modal.set("definition", definition.definition)
		})

		withPluginApi("0.8.24", api => {
			api.decorateCooked($elem => {
        let user = api.getCurrentUser()
				if(user && user.get("custom_fields").disable_definitions) {
					return
        }

        if($elem.html().includes('<span class="discourse-definitions-definition" data-name="')){
          return
        }

				for(let definition of names) {
          let name = definition.word
					if(definition.locale === I18n.locale) {
						const definitionRegex = new RegExp(`\\b(${regexEscape(name)})(?!(.(?!<a))*<\\/a>)\\b`, "gi")
						$elem.contents().filter(function() {
							return definitionRegex.test($(this).text())
						}).html((_, html) => {
              html = html.replace(definitionRegex, `<span class="discourse-definitions-definition" data-name="${name}">$1</span>`)
							return html
						})
					}
				}
			}, { id: "discourse-definitions" })

			api.modifyClass("controller:preferences/interface", {
				actions: {
					save() {
						this.get("saveAttrNames").push("custom_fields")
						this._super()
					}
				}
			})
		})
	}
}
