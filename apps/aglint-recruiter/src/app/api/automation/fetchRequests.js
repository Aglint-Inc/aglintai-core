const { supabase } = require('./config');

async function fetchTodoRequests(limit = 15) {
    const { data: requests, error } = await supabase
        .from('request')
        .select('id, application_id')
        .eq('status', 'todo')
        .limit(limit);

    if (error) {
        console.error('Error fetching requests:', error);
        return [];
    }

    return requests;
}

module.exports = {
    fetchTodoRequests,
};
