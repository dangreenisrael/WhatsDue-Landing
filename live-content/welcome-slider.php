<?php header('Access-Control-Allow-Origin: *'); ?>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide swiper-no-swiping">
            <div class="content-slide start">
                <h2>Find Your School</h2>
                <form>
                    <select id="schoolName">
                        <option value="IDC Herzliya">IDC Herzliya</option>
                        <option value="UMD University of Maryland">UMD (University of Maryland)</option>
                        <option value="UNK (University of Nebraska Kearney)">UNK (University of Nebraska Kearney)</option>
                        <option value="KPU (Kwantlen Polytechnic University)">KPU (Kwantlen Polytechnic University)</option>
                    </select>
                </form>
                <p class="button my-school hidden">
                    I go to <i><strong id="school-name"></strong></i>
                </p>
            </div>
        </div>

        <div class="swiper-slide">
            <div class="content-slide next">
                <h2>ADD ALL YOUR COURSES</h2>
                <p>
                    Search by instructor or course name
                </p>
                <img src="http://whatsdueapp.com/live-content/assets/onboarding/add-course.png">
                <p class="button">
                    NEXT
                </p>
            </div>
        </div>

        <div class="swiper-slide">
            <div class="content-slide finish">
                <h2>Check What's Due</h2>
                <p>
                    Swipe stuff away when you finish
                </p>
                <img src="http://whatsdueapp.com/live-content/assets/onboarding/swipe-remove.png">
                <p class="button">
                    ADD A CLASS
                </p>
            </div>
        </div>



    </div>
</div>
<div class="pagination"></div>