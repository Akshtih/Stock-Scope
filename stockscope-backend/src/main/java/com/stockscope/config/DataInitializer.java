package com.stockscope.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import com.stockscope.model.Blog;
import com.stockscope.model.Course;
import com.stockscope.model.Dictionary;
import com.stockscope.repository.BlogRepository;
import com.stockscope.repository.CourseRepository;
import com.stockscope.repository.DictionaryRepository;

/**
 * This class initializes the database with sample data on application startup.
 * Comment out @Component annotation if you don't want to run this on every startup.
 */
// @Component  // Uncomment this line to enable automatic sample data insertion
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private DictionaryRepository dictionaryRepository;

    @Override
    public void run(String... args) throws Exception {
        
        // Check if data already exists
        if (courseRepository.count() == 0) {
            initializeCourses();
            System.out.println("✅ Sample courses added to database");
        }
        
        if (blogRepository.count() == 0) {
            initializeBlogs();
            System.out.println("✅ Sample blogs added to database");
        }
        
        if (dictionaryRepository.count() == 0) {
            initializeDictionary();
            System.out.println("✅ Sample dictionary terms added to database");
        }
    }

    private void initializeCourses() {
        Course course1 = new Course(
            "Stock Market Fundamentals",
            "Learn the basic concepts of stock market investing including stocks, bonds, and mutual funds.",
            "Novice",
            "https://www.5paisa.com/finschool/wp-content/uploads/2021/10/pana-1.svg",
            "Beginner",
            120,
            true
        );

        Course course2 = new Course(
            "Value Investing Strategies",
            "Master the art of value investing with Warren Buffett's proven strategies.",
            "Investor",
            "https://www.5paisa.com/finschool/wp-content/uploads/2025/07/Investor-courses-cat.png",
            "Intermediate",
            180,
            true
        );

        Course course3 = new Course(
            "Technical Analysis & Chart Patterns",
            "Advanced trading techniques using technical indicators and chart patterns.",
            "Trader",
            "https://www.5paisa.com/finschool/wp-content/uploads/2025/07/trader-courses-cat.png",
            "Advanced",
            240,
            true
        );

        courseRepository.save(course1);
        courseRepository.save(course2);
        courseRepository.save(course3);
    }

    private void initializeBlogs() {
        Blog blog1 = new Blog(
            "Understanding Bull and Bear Markets",
            "In this comprehensive guide, we explore the characteristics of bull and bear markets, how to identify them, and strategies to navigate through different market conditions...",
            "Blogs",
            "StockScope Team",
            "https://static.vecteezy.com/system/resources/previews/003/042/125/original/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg",
            "A detailed guide to understanding market cycles and trends",
            8,
            true
        );

        Blog blog2 = new Blog(
            "What's Happening in IPO Markets?",
            "The latest trends in Initial Public Offerings (IPOs) and what investors should watch out for in the current market scenario...",
            "What's Brewing",
            "Market Analyst",
            "https://www.5paisa.com/finschool/wp-content/uploads/2023/06/2-1.svg",
            "Stay updated with the latest IPO market trends",
            5,
            true
        );

        Blog blog3 = new Blog(
            "The Story of a First-Time Investor",
            "Follow Raj's journey from a complete novice to a confident investor. Learn from his mistakes and successes...",
            "Stories",
            "StockScope Team",
            "https://www.5paisa.com/finschool/wp-content/uploads/2023/06/1-1.svg",
            "An inspiring story of financial learning",
            6,
            true
        );

        blogRepository.save(blog1);
        blogRepository.save(blog2);
        blogRepository.save(blog3);
    }

    private void initializeDictionary() {
        Dictionary term1 = new Dictionary(
            "Bull Market",
            "A financial market condition where prices are rising or are expected to rise. Bull markets are characterized by optimism, investor confidence, and expectations that strong results should continue.",
            "Market Conditions",
            "The stock market experienced a strong bull market throughout 2021, with major indices reaching all-time highs.",
            "Bear Market, Market Rally, Uptrend"
        );

        Dictionary term2 = new Dictionary(
            "Dividend",
            "A portion of a company's earnings distributed to shareholders, usually paid quarterly. Dividends can be issued as cash payments, shares of stock, or other property.",
            "Stock Market",
            "Apple Inc. paid a dividend of $0.23 per share in the last quarter.",
            "Dividend Yield, Ex-Dividend Date, Dividend Aristocrat"
        );

        Dictionary term3 = new Dictionary(
            "P/E Ratio",
            "Price-to-Earnings ratio is a valuation metric that compares a company's current share price to its per-share earnings. It helps investors determine if a stock is overvalued or undervalued.",
            "Fundamental Analysis",
            "A stock trading at $50 per share with earnings of $5 per share has a P/E ratio of 10.",
            "EPS, Valuation, Market Cap"
        );

        Dictionary term4 = new Dictionary(
            "IPO",
            "Initial Public Offering - the first time a company offers its shares to the public for purchase. This allows the company to raise capital from public investors.",
            "Stock Market",
            "Zomato went public with an IPO in July 2021, raising over ₹9,000 crores.",
            "Primary Market, Secondary Market, Public Listing"
        );

        dictionaryRepository.save(term1);
        dictionaryRepository.save(term2);
        dictionaryRepository.save(term3);
        dictionaryRepository.save(term4);
    }
}
