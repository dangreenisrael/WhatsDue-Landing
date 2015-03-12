<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    $json = file_get_contents('http://stage.whatsdueapp.com/student/schools');
    $schools = json_decode($json);
    $options = "";
    foreach ($schools->school as $school){
        $options .= "<option value='$school'>$school</option>\n";
    }
?>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide swiper-no-swiping">
            <div class="content-slide start">
                <h2>Find Your School</h2>
                <form>
                    <select id="schoolName">
                        <?php echo $options;?>
                    </select>
                </form>
                <p class="button my-school hidden">
                    I go to <br/><i><strong id="school-name"></strong></i>
                </p>
            </div>
        </div>

        <div class="swiper-slide">
            <div class="content-slide next">
                <h2>ADD ALL YOUR COURSES</h2>
                <p>
                    Search by instructor or course name
                </p>
                <p>
                    Tell us if your course isn't there
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
                <p>
                    Double Tap for more options
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