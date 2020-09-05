import { html, css, LitElement } from "lit-element";

export class LitCocktail extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--lit-cocktail-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Array },
      cocktails: { type: Array },
      completeData: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = [];
    this.completeData = [];
    this.cocktails = [];
  }

  firstUpdated() {
    fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
    )
      .then((r) => r.json())
      .then((r) => {
        this.data = r.drinks;
        this._handleCocktails();
      });
  }

  _handleCocktails() {
    this.data.forEach((cocktail) => {
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
      )
        .then((r) => r.json())
        .then((r) => {
          this.cocktails.push(r.drinks[0]);
          this.completeData = this.cocktails.map((cocktail) => {
            return {
              id: cocktail.idDrink,
              name: cocktail.strDrink,
              image: cocktail.strDrinkThumb,
              preparation: cocktail.strInstructions,
              ingredients: [
                cocktail.strIngredient,
                cocktail.strIngredient2,
                cocktail.strIngredient3,
              ],
            };
          });
          console.log(this.completeData);
        });
    });
    setTimeout(() => {
      console.log(this.completeData);
      this.dispatchEvent(
        new CustomEvent("response", { detail: this.completeData })
      );
    }, 1000);
  }
  render() {
    return html``;
  }
}
