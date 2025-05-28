interface FilterParams {
    category?: string;
    search?: string;
    filters?: Record<string, string | number>;
  }
  
  export const buildAggregationPipeline = ({ category, search, filters }: FilterParams) => {
    const pipeline: any[] = [];
  
    // Atlas Search (Fuzzy)
    if (search) {
      pipeline.push({
        $search: {
          index: 'default',
          text: {
            query: search,
            path: 'searchable_text',
            fuzzy: {}
          }
        }
      });
    }
  
    // Filter stage
    const match: any = {};
    if (category) match.category = category;
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        match[`attributes.${key}`] = value;
      }
    }
    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }
  
    // Facet stage
    pipeline.push({
      $facet: {
        brands: [
          { $group: { _id: '$attributes.brand', count: { $sum: 1 } } }
        ],
        colors: [
          { $match: { 'attributes.color': { $exists: true } } },
          { $group: { _id: '$attributes.color', count: { $sum: 1 } } }
        ],
        sizes: [
          { $match: { 'attributes.size': { $exists: true } } },
          { $group: { _id: '$attributes.size', count: { $sum: 1 } } }
        ],
        priceRange: [
          {
            $bucket: {
              groupBy: '$price',
              boundaries: [0, 1000, 3000, 10000, 50000],
              default: 'Other',
              output: { count: { $sum: 1 } }
            }
          }
        ]
      }
    });
  
    return pipeline;
  };
  