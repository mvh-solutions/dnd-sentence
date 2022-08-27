	import { createRoot } from 'react-dom/client'
    import { Sentence } from './Sentence.js'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'

	function App() {
		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Sentence />
				</DndProvider>
			</div>
		)
	}

	const container = document.getElementById('root')
    const root = createRoot(container);
	root.render(<App />)
