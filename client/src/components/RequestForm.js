import React from 'react';

const RequestForm = () => {
    render() {
        return (
            <form onSubmit={handleSubmit}>
                <h2>New Request</h2>
                <div>
                    <div>
                        <label htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="Description">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="start-time">
                            Start Time
                        </label>
                        <input
                            type="text"
                            id="start-time"
                            name="start-time"
                            value={formData.start-time}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="end-time">
                            End Time
                        </label>
                        <input
                            type="text"
                            id="end-time"
                            name="end-time"
                            value={formData.end-time}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default RequestForm;
