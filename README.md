Type-safe OOP-like sugar for redux + fields sugar.

[Описание идеи](https://medium.com/@viktorlove/oop-like-redux-sugar-6ec58a781bae)
[Deployed "todo" app](https://vlova.github.io/redux-sugar-prototype/)

# Clone & run

1. `git clone https://github.com/vlova/redux-sugar-prototype.git`
2. `cd redux-sugar-prototype`
2. `npm i`
3. `npm start`

# OOP-like sugar

![](https://miro.medium.com/max/1639/1*s2v0rgwrS9fC8iCow5eECQ.png)
```
dispatch(todoActions.updateText({
    id,
    text: 'kill humans'
}));
```

# Fields sugar

![](https://miro.medium.com/max/1283/1*e3jzmMWEAlLsyISrQv1TjQ.png)

```
const [text, updateText]
 = useField(todoItemFields.text, id);
 
return (
  <TextField
    value={text}
    onChange={updateText}
  />)
)
```
