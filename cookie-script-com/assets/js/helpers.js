const UPDATE_KEY = "cslua"
const WINDOW_MS  = 24 * 60 * 60 * 1000

function safeGet(key) {
	try { return localStorage.getItem(key) } catch { return null }
}
function safeSet(key, val) {
	try { localStorage.setItem(key, val) } catch {}
}

function getLastUpdateTs() {
	const raw = safeGet(UPDATE_KEY)
	const ts = raw ? Number(raw) : null

	return Number.isFinite(ts) ? ts : null
}

function canUpdate(now = Date.now()) {
	const last = getLastUpdateTs()

	return last === null || (now - last) >= WINDOW_MS
}

function timeUntilNext(now = Date.now()) {
	const last = getLastUpdateTs()

	if (last === null) {
		return 0
	}

	return Math.max(0, WINDOW_MS - (now - last))
}

function markUpdated(ts = Date.now()) {
	safeSet(UPDATE_KEY, String(ts))
}

function formatRemaining(ms) {
	const minutes = Math.ceil(ms / 60000)

	if (minutes >= 60) {
		const h = Math.floor(minutes / 60)
		const m = minutes % 60
		return m ? `${h}h ${m}m` : `${h}h`
	}

	return `${minutes}m`
}
