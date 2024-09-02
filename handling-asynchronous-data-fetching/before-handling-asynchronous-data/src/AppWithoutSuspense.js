import React from 'react';

class AppWithoutSuspense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const startTime = performance.now();  // Mulai pengukuran waktu

    const fetchData = async () => {
      try {
        const result = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await result.json();
        this.setState({ data, loading: false });

        const endTime = performance.now();  // Akhiri pengukuran waktu
        console.log(`Load time: ${endTime - startTime} ms`);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    fetchData();
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        {data.map((item) => (
          <img key={item.id} src={item.url} alt={item.title} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    );
  }
}

export default AppWithoutSuspense;
