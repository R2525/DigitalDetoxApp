# React to Kotlin/Compose Conversion Guide

## Quick Reference: React vs Jetpack Compose

### State Management

| React | Jetpack Compose |
|-------|-----------------|
| `useState` | `remember { mutableStateOf() }` |
| `useEffect` | `LaunchedEffect` |
| `useContext` | `CompositionLocalProvider` |
| Props | Function parameters |
| Redux/Context | ViewModel + StateFlow |

**Example:**
```javascript
// React
const [count, setCount] = useState(0);
```
```kotlin
// Compose
var count by remember { mutableStateOf(0) }
// Or in ViewModel:
private val _count = MutableStateFlow(0)
val count: StateFlow<Int> = _count.asStateFlow()
```

### Lifecycle

| React | Jetpack Compose |
|-------|-----------------|
| `useEffect(() => {}, [])` | `LaunchedEffect(Unit) { }` |
| `useEffect(() => {}, [dep])` | `LaunchedEffect(dep) { }` |
| Component unmount | `DisposableEffect { onDispose { } }` |

**Example:**
```javascript
// React
useEffect(() => {
  // On mount
  return () => {
    // On unmount
  };
}, []);
```
```kotlin
// Compose
DisposableEffect(Unit) {
    // On mount
    onDispose {
        // On unmount
    }
}
```

### UI Components

| React/HTML | Jetpack Compose |
|------------|-----------------|
| `<div>` | `Box` / `Column` / `Row` |
| `<button>` | `Button` |
| `<input>` | `TextField` / `OutlinedTextField` |
| `<img>` | `Image` |
| `className` | `Modifier` |
| CSS styles | Modifier chains |

### Styling

**React (Tailwind):**
```jsx
<div className="flex flex-col items-center p-4 bg-primary rounded-lg">
```

**Compose:**
```kotlin
Column(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp)
        .background(
            color = MaterialTheme.colorScheme.primary,
            shape = RoundedCornerShape(12.dp)
        ),
    horizontalAlignment = Alignment.CenterHorizontally
)
```

### Conditional Rendering

**React:**
```jsx
{isActive && <Component />}
{isActive ? <A /> : <B />}
```

**Compose:**
```kotlin
if (isActive) {
    Component()
}

if (isActive) A() else B()
```

### Lists

**React:**
```jsx
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

**Compose:**
```kotlin
// For short lists:
items.forEach { item ->
    Item(data = item)
}

// For long lists (optimized):
LazyColumn {
    items(items) { item ->
        Item(data = item)
    }
}
```

### Navigation

**React (State-based):**
```jsx
const [screen, setScreen] = useState('home');
// ...
{screen === 'home' && <HomeScreen />}
```

**Compose:**
```kotlin
when (currentScreen) {
    Screen.Home -> HomeScreen()
    Screen.Profile -> ProfileScreen()
}
```

### Props vs Parameters

**React:**
```jsx
function Button({ text, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>{text}</button>
}

<Button text="Click" onClick={handleClick} disabled={false} />
```

**Compose:**
```kotlin
@Composable
fun Button(
    text: String,
    onClick: () -> Unit,
    enabled: Boolean = true
) {
    Button(onClick = onClick, enabled = enabled) {
        Text(text)
    }
}

Button(text = "Click", onClick = { handleClick() })
```

## File Structure Mapping

### React Project
```
src/
├── App.tsx                        # Main component
├── components/                    # Components
│   ├── DashboardScreen.tsx
│   ├── MissionDetailScreen.tsx
│   └── BottomNavigation.tsx
└── styles/
    └── globals.css                # Tailwind styles
```

### Kotlin Project
```
app/src/main/java/com/digitaldetox/
├── ui/
│   ├── MainActivity.kt            # Entry point
│   ├── screens/                   # Screen composables
│   │   ├── DashboardScreen.kt
│   │   └── MissionDetailScreen.kt
│   ├── components/                # Reusable composables
│   │   └── BottomNavigationBar.kt
│   └── theme/                     # Material theme
│       ├── Color.kt
│       ├── Theme.kt
│       └── Type.kt
├── viewmodel/                     # State management
│   └── DigitalDetoxViewModel.kt
└── data/                          # Data models
    └── App.kt
```

## Common Conversions

### 1. onClick Handler

**React:**
```jsx
<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>
```

**Compose:**
```kotlin
Button(onClick = { count++ }) {
    Text("Count: $count")
}
```

### 2. Text Input

**React:**
```jsx
<input 
  value={text}
  onChange={e => setText(e.target.value)}
  placeholder="Enter text"
/>
```

**Compose:**
```kotlin
OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    placeholder = { Text("Enter text") }
)
```

### 3. Toggle/Switch

**React:**
```jsx
<input 
  type="checkbox"
  checked={isChecked}
  onChange={e => setIsChecked(e.target.checked)}
/>
```

**Compose:**
```kotlin
Switch(
    checked = isChecked,
    onCheckedChange = { isChecked = it }
)
```

### 4. Modal/Dialog

**React:**
```jsx
{isOpen && (
  <div className="modal">
    <div className="modal-content">
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  </div>
)}
```

**Compose:**
```kotlin
if (isOpen) {
    AlertDialog(
        onDismissRequest = { isOpen = false },
        confirmButton = {
            TextButton(onClick = { isOpen = false }) {
                Text("Close")
            }
        },
        text = { Text("Dialog content") }
    )
}
```

### 5. Loading State

**React:**
```jsx
{isLoading ? <Spinner /> : <Content />}
```

**Compose:**
```kotlin
if (isLoading) {
    CircularProgressIndicator()
} else {
    Content()
}
```

## State Management Patterns

### React (Context + Hooks)
```jsx
const AppContext = createContext();

function App() {
  const [state, setState] = useState(initialState);
  
  return (
    <AppContext.Provider value={{ state, setState }}>
      <Child />
    </AppContext.Provider>
  );
}

function Child() {
  const { state, setState } = useContext(AppContext);
  // Use state
}
```

### Compose (ViewModel + StateFlow)
```kotlin
class MyViewModel : ViewModel() {
    private val _state = MutableStateFlow(initialState)
    val state: StateFlow<State> = _state.asStateFlow()
    
    fun updateState(newState: State) {
        _state.value = newState
    }
}

@Composable
fun App(viewModel: MyViewModel = viewModel()) {
    val state by viewModel.state.collectAsState()
    Child(state = state, onUpdate = viewModel::updateState)
}
```

## Storage

| React | Android |
|-------|---------|
| localStorage | SharedPreferences |
| sessionStorage | In-memory state |
| IndexedDB | Room Database |
| Cookies | SharedPreferences |

**Example:**
```javascript
// React
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
```

```kotlin
// Android
val prefs = context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)
prefs.edit().putString("theme", "dark").apply()
val theme = prefs.getString("theme", "light")
```

## Async Operations

**React:**
```javascript
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  }
  fetchData();
}, []);
```

**Compose:**
```kotlin
LaunchedEffect(Unit) {
    viewModelScope.launch {
        val data = repository.fetchData()
        _data.value = data
    }
}
```

## Styling Comparison

### Flexbox → Row/Column
```jsx
// React
<div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
```
```kotlin
// Compose
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.spacedBy(16.dp)
)
```

### Padding/Margin
```jsx
// React Tailwind
className="p-4 m-2"
```
```kotlin
// Compose
Modifier
    .padding(16.dp)
    .padding(top = 8.dp)
```

### Border Radius
```jsx
// React
className="rounded-lg"
style={{ borderRadius: '12px' }}
```
```kotlin
// Compose
Modifier.clip(RoundedCornerShape(12.dp))
// or for background:
.background(
    color = Color.Blue,
    shape = RoundedCornerShape(12.dp)
)
```

### Colors
```jsx
// React Tailwind
className="bg-blue-500 text-white"
```
```kotlin
// Compose
Modifier.background(MaterialTheme.colorScheme.primary)
Text(color = MaterialTheme.colorScheme.onPrimary)
```

## Animation

**React:**
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Compose:**
```kotlin
val alpha by animateFloatAsState(
    targetValue = if (visible) 1f else 0f,
    animationSpec = tween(durationMillis = 500)
)

Box(modifier = Modifier.alpha(alpha)) {
    Content()
}
```

## Material Design Components

| React/HTML | Material 3 Compose |
|------------|-------------------|
| Card | `Card { }` |
| Dialog | `AlertDialog { }` |
| Chip | `AssistChip` / `FilterChip` |
| Tab | `TabRow + Tab` |
| Progress | `LinearProgressIndicator` / `CircularProgressIndicator` |
| Menu | `DropdownMenu` |
| Divider | `HorizontalDivider` / `VerticalDivider` |

## Tips for Conversion

1. **Think in Composition**: Compose is declarative - describe what the UI should look like for each state

2. **Immutability**: Prefer immutable data structures and create new instances for state updates

3. **Recomposition**: Compose automatically recomposes when state changes - no need for manual updates

4. **Performance**: Use `remember` for expensive calculations and `LazyColumn/Row` for long lists

5. **Modifiers**: Chain modifiers thoughtfully - order matters!

6. **Theme First**: Use Material Theme colors and typography instead of hardcoded values

7. **ViewModel Pattern**: Keep business logic in ViewModels, UI in Composables

8. **Testing**: Compose has great testing support with `ComposeTestRule`

## Resources

- [Jetpack Compose Documentation](https://developer.android.com/jetpack/compose)
- [Material Design 3](https://m3.material.io/)
- [Compose Samples](https://github.com/android/compose-samples)
- [Thinking in Compose](https://developer.android.com/jetpack/compose/mental-model)

---

**Pro Tip**: When converting, start with the data layer (models), then ViewModels, then UI screens. This bottom-up approach ensures solid foundations.
