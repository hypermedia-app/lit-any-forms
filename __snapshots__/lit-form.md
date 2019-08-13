# `lit-form`

## `buttons`

####   `should not render a submit button when disabled`

```html
<form>
  <div class="fieldset">
    <div class="field">
      <label for="field_one">
        field_one
      </label>
    </div>
  </div>
  <input
    type="button"
    value="Reset"
  >
  <input
    type="button"
    value="Clear"
  >
</form>

```

####   `should render default buttons`

```html
<form>
  <div class="fieldset">
    <div class="field">
      <label for="field_one">
        field_one
      </label>
    </div>
  </div>
  <input
    type="button"
    value="Submit"
  >
  <input
    type="button"
    value="Reset"
  >
  <input
    type="button"
    value="Clear"
  >
</form>

```

####   `should allow changing button text`

```html
<form>
  <div class="fieldset">
    <div class="field">
      <label for="field_one">
        field_one
      </label>
    </div>
  </div>
  <input
    type="button"
    value="Wyślij"
  >
  <input
    type="button"
    value="Przywróć"
  >
  <input
    type="button"
    value="Wyczyść"
  >
</form>

```

####   `should not render a submit button when disabled`

```html
<form>
  <div class="fieldset">
    <div class="field">
      <label for="field_one">
        field_one
      </label>
    </div>
  </div>
  <input
    type="button"
    value="Reset"
  >
  <input
    type="button"
    value="Clear"
  >
</form>

```

####   `should not render a reset button when disabled`

```html
<form>
  <div class="fieldset">
    <div class="field">
      <label for="field_one">
        field_one
      </label>
    </div>
  </div>
  <input
    type="button"
    value="Submit"
  >
  <input
    type="button"
    value="Clear"
  >
</form>

```

####   `should not render a clear button when disabled`

```html
<form>
  <div class="fieldset">
    <div class="field">
      <label for="field_one">
        field_one
      </label>
    </div>
  </div>
  <input
    type="button"
    value="Submit"
  >
  <input
    type="button"
    value="Reset"
  >
</form>

```

