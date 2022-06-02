const supabase = require('./db/supabase');

const main = async () => {
  console.log('testSupabase')

  try {
    const { data, error } = await supabase
      .from('channels')
      .select('*')

    if (error) throw error

    console.log(data)
  } catch(e) {
    console.error(e)
  }
}

main()
