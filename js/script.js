var portfolio = (function() {

	var $el = $( '#main' ),
		$sections = $el.children( 'section' ),
		 
		$sectionWork = $( '#work-section' ),
		 
		$workItems = $( '#work-items > li' ),
		 
		$workPanelsContainer = $( '#panel-work-items' ),

		$workPanels = $workPanelsContainer.children( 'div' ),

		$panelInfo = $workPanelsContainer.find( '.panel-info'),

		totalWorkPanels = $workPanels.length,
		 
		$nextWorkItem = $workPanelsContainer.find( 'nav > span.next-work' ),

		$prevWorkItem = $workPanelsContainer.find( 'nav > span.prev-work' ),
		
		 
		isAnimating = false,
		 
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.icon-close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		 
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		 
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$sections.each( function() {
			
			var $section = $( this );

			 
			$section.on( 'click', function() {

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'expand expand-top' );
					$el.addClass( 'expand-item' );	
				}

			} ).find( 'span.icon-close' ).on( 'click', function() {
				
				 
				$section.data( 'open', false ).removeClass( 'expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'expand-top' );
				}

				$el.removeClass( 'expand-item' );
				
				return false;

			} );

		} );

	 
		$workItems.on( 'click', function( event ) {

			 
			$sectionWork.addClass( 'scale-down' );

		 
			$workPanelsContainer.addClass( 'panel-items-show' );

			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");

			currentWorkPanel = $panel.index();


			$panelInfo.html( currentWorkPanel + '/' + (totalWorkPanels - 1) );

			$panel.addClass( 'show-work' );

			return false;

		} );

		
		$nextWorkItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			console.log("current = " + currentWorkPanel + ", totalWorkPanels = " + totalWorkPanels);
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 1;
			var $nextPanel = $workPanels.eq( currentWorkPanel );
			$panelInfo.html( currentWorkPanel + '/' + (totalWorkPanels - 1) );

			$currentPanel.removeClass( 'show-work' ).addClass( 'hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'show-work' );

			return false;

		} );

		$prevWorkItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			console.log("current = " + currentWorkPanel + ", totalWorkPanels = " + totalWorkPanels);
			// currentWorkPanel = currentWorkPanel > totalWorkPanels - 1 ? currentWorkPanel - 1 : 0;
			currentWorkPanel = currentWorkPanel > 1 ? currentWorkPanel - 1 : totalWorkPanels - 1;
			$panelInfo.html( currentWorkPanel + '/' + (totalWorkPanels - 1) );
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'show-work' ).addClass( 'hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'show-work' );

			return false;

		} );

		
		$closeWorkItem.on( 'click', function( event ) {

			
			$sectionWork.removeClass( 'scale-down' );
			$workPanelsContainer.removeClass( 'panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'show-work' );
			
			return false;

		} );

	}

	return { init : init };

})();