const validateBookData = (data: Record<string, unknown>, partial = false): string | null => {

    if (!partial) {
        if (typeof data.title !== "string" || !data.title.trim()) {
            return "El título es obligatorio"
        }

        if (typeof data.author !== "string" || !data.author.trim()) {
            return "El autor es obligatorio"
        }
    }

    if ("title" in data && (typeof data.title !== "string" || !data.title.trim())) {
        return "El título debe ser un texto válido"
    }

    if ("author" in data && (typeof data.author !== "string" || !data.author.trim())) {
        return "El autor debe ser un texto válido"
    }

    if ("publishedYear" in data && (typeof data.publishedYear !== "number" || !Number.isFinite(data.publishedYear))) {
        return "El año de publicación debe ser un número válido"
    }

    if ("genre" in data && typeof data.genre !== "string") {
        return "El género debe ser un texto"
    }

    if ("available" in data && typeof data.available !== "boolean") {
        return "La disponibilidad debe ser un booleano"
    }

    return null
}

export { validateBookData }