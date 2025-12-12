# Usage Examples

This document provides real-world examples of how to use the AI Data Analyst.

## Example 1: Sales Analysis

### Sample Data (sales_report.csv)
```csv
date,product,quantity,revenue,region,sales_rep
2024-01-01,Laptop,5,5000,North,John
2024-01-01,Mouse,20,400,South,Sarah
2024-01-02,Laptop,3,3000,North,John
2024-01-02,Keyboard,15,750,East,Mike
2024-01-03,Monitor,8,2400,West,Lisa
```

### Questions You Can Ask

**Basic Statistics:**
- "What's the total revenue?"
- "What's the average quantity sold per transaction?"
- "How many unique products are there?"

**Top Performers:**
- "What are the top 3 products by revenue?"
- "Which sales rep generated the most revenue?"
- "Show me the best performing region"

**Trends:**
- "Show me revenue trends over time"
- "Create a line chart of daily sales"

**Comparisons:**
- "Compare revenue by region"
- "Show me a bar chart of products by quantity sold"

## Example 2: Customer Data Analysis

### Sample Data (customers.csv)
```csv
customer_id,age,gender,purchase_count,total_spent,membership_level
1001,25,F,5,450,Silver
1002,34,M,12,1200,Gold
1003,45,F,3,280,Bronze
1004,28,M,8,890,Silver
1005,52,F,15,2100,Platinum
```

### Questions You Can Ask

**Demographics:**
- "What's the average age of customers?"
- "Show me the distribution of customers by gender"
- "How many customers are in each membership level?"

**Spending Patterns:**
- "What's the average spending by membership level?"
- "Show me a scatter plot of age vs total spent"
- "Which age group spends the most?"

**Segmentation:**
- "Create a pie chart of membership levels"
- "Compare purchase counts across different age groups"

## Example 3: Website Analytics

### Sample Data (web_traffic.csv)
```csv
date,page_views,unique_visitors,bounce_rate,avg_session_duration
2024-01-01,1500,450,0.35,180
2024-01-02,1800,520,0.32,195
2024-01-03,1200,380,0.42,165
2024-01-04,2100,610,0.28,210
```

### Questions You Can Ask

**Performance Metrics:**
- "What's the average bounce rate?"
- "Show me the trend of unique visitors over time"
- "Which day had the highest page views?"

**Correlations:**
- "Is there a correlation between page views and bounce rate?"
- "Show me how session duration relates to bounce rate"

**Visualizations:**
- "Create a line chart showing all metrics over time"
- "Show me a bar chart of daily page views"

## Example 4: Inventory Management

### Sample Data (inventory.csv)
```csv
product_id,product_name,category,stock_level,reorder_point,unit_cost
101,Widget A,Electronics,45,20,15.50
102,Widget B,Electronics,12,25,22.00
103,Gadget X,Accessories,150,50,8.75
104,Tool Y,Hardware,8,15,35.00
105,Part Z,Components,200,100,5.25
```

### Questions You Can Ask

**Stock Analysis:**
- "Which products are below their reorder point?"
- "What's the total inventory value?" (stock_level * unit_cost)
- "Show me stock levels by category"

**Cost Analysis:**
- "What's the average unit cost by category?"
- "Which products have the highest unit cost?"
- "Create a bar chart of products by stock level"

**Alerts:**
- "How many products need reordering?"
- "Show me the distribution of stock levels"

## Example 5: Financial Data

### Sample Data (expenses.csv)
```csv
date,category,amount,department,description
2024-01-01,Software,299,IT,Subscription
2024-01-02,Office,450,Admin,Supplies
2024-01-03,Travel,1200,Sales,Conference
2024-01-04,Software,99,Marketing,Tools
2024-01-05,Office,200,Admin,Furniture
```

### Questions You Can Ask

**Budget Analysis:**
- "What's the total spending by category?"
- "Which department has the highest expenses?"
- "Show me daily spending trends"

**Category Breakdown:**
- "Create a pie chart of expenses by category"
- "What percentage of spending is on software?"
- "Compare spending across departments"

**Time-based Analysis:**
- "Show me spending trends over time"
- "What's the average daily expense?"

## Tips for Better Results

### 1. Be Specific
❌ "Show me the data"
✅ "What are the top 5 products by revenue?"

### 2. Request Visualizations
❌ "Tell me about sales"
✅ "Create a bar chart of sales by region"

### 3. Ask Follow-up Questions
1. "What's the total revenue?"
2. "Now break that down by region"
3. "Show me the top region as a percentage of total"

### 4. Use Column Names
❌ "Show me the trends"
✅ "Show me the trend of revenue over time"

### 5. Combine Metrics
- "Compare average age and total spent by membership level"
- "Show me revenue and quantity sold for each product"

## Advanced Queries

### Statistical Analysis
- "Calculate the standard deviation of [column]"
- "Show me the correlation matrix"
- "Find outliers in [column]"

### Data Quality
- "How many missing values are in each column?"
- "Show me duplicate records"
- "What's the data quality score?"

### Aggregations
- "Group by [column] and show average [metric]"
- "Calculate the sum of [column] by [category]"
- "Show me the median value for each group"

## Common Use Cases

### E-commerce
- Product performance analysis
- Customer segmentation
- Sales forecasting
- Inventory optimization

### Marketing
- Campaign performance
- Customer acquisition cost
- Conversion rate analysis
- Channel attribution

### Operations
- Resource utilization
- Process efficiency
- Quality metrics
- Capacity planning

### Finance
- Budget vs actual analysis
- Expense tracking
- Revenue forecasting
- Cost optimization

## Need Help?

If you're not getting the results you expect:
1. Check your data format and column names
2. Try rephrasing your question
3. Start with simple queries and build up
4. Review the data info panel to understand your dataset
5. Look at the sample data to verify it loaded correctly
