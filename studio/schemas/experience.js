export default {
    name: "experience",
    title: "Experience",
    type: "document",
    fields: [
        {
            name: "company_name",
            type: "string",
        },
        {
            name: "job_title",
            type: "string",
        },
        {
            name: "date_from",
            type: "datetime",
        },
        {
            name: "date_to",
            type: "datetime",
        },
        {
            name: "place",
            type: "string"
        },
        {
            name: "description",
            type: "text",
        },
        {
            name: "link",
            type: "url",
        }
    ]
}